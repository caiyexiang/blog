const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const baseConfig = require('./webpack.base.conf.js')
const resolve = dir => path.join(__dirname, '..', dir)

const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(baseConfig(isProd), {
  mode: isProd ? 'production' : 'development',
  target: 'node',
  devtool: '#source-map',
  entry: {
    server: resolve('src/entry-server.js')
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
