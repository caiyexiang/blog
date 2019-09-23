const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs')
const webpack = require('webpack')
const chokidar = require('chokidar')
const clientConfig = require('./webpack.client.conf')
const serverConfig = require('./webpack.server.conf')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {
    console.error(e)
  }
}

module.exports = function setupDevServer(app, templatePath, cb) {
  let bundle, template, clientManifest
  let ready
  const readyPromise = new Promise(r => {
    ready = r
  })
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template update.')
  })
  clientConfig.entry.client = [
    'webpack-hot-middleware/client',
    clientConfig.entry.client
  ]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('./koa-webpack-dev-middleware')(
    clientCompiler,
    {
      publicPath: clientConfig.output.publicPath,
      noInfo: true
    }
  )

  app.use(devMiddleware)

  clientCompiler.hooks.done.tap('clientCompiler', () => {
    clientManifest = JSON.parse(
      readFile(devMiddleware.fileSystem, 'vue-ssr-client-manifest.json')
    )
    update()
  })

  const hotMiddleware = require('./koa-webpack-hot-middleware')(
    clientCompiler,
    { heartbeat: 5000 }
  )

  app.use(hotMiddleware)

  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise
}
