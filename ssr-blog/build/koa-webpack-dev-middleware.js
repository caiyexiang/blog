const webpackDevMiddleware = require('webpack-dev-middleware')

const stats = { chunkModules: false, colors: 'debug' != process.env.NODE_ENV }

module.exports = (compiler, options = {}) => {
  const { publicPath } = compiler.options.output
  const defaults = options.publicPath ? options : { publicPath, stats }
  const middleware = webpackDevMiddleware(
    compiler,
    Object.assign({}, defaults, options)
  )
  const middlewareFn = async (context, next) => {
    const hasNext = await applyMiddleware(middleware, context.req, {
      end: content => {
        context.body = content
      },
      send: content => (context.body = content),
      setHeader: function() {
        context.set.apply(context, arguments)
      }
    })
    hasNext && (await next())
  }
  middlewareFn.fileSystem = middleware.fileSystem
  return middlewareFn
}

function applyMiddleware(middleware, req, res) {
  const _send = res.send
  return new Promise((resolve, reject) => {
    try {
      res.send = function() {
        _send.apply(res, arguments) && resolve(false)
      }
      middleware(req, res, resolve.bind(null, true))
    } catch (error) {
      reject(error)
    }
  })
}
