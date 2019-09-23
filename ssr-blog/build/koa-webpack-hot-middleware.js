const webpackHotMiddleware = require('webpack-hot-middleware')
const PassThrough = require('stream').PassThrough

module.exports = (compiler, opts) => {
  const middleware = webpackHotMiddleware(compiler, opts)
  return async (ctx, next) => {
    let stream = new PassThrough()
    ctx.body = stream
    await middleware(
      ctx.req,
      {
        write: stream.write.bind(stream),
        writeHead: (status, headers) => {
          ctx.status = status
          ctx.set(headers)
        },
        end: content => {
          ctx.body = content
        }
      },
      next
    )
  }
}
