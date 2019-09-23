const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const resolve = dir => path.join(__dirname, '..', dir)

const isProd = process.env.NODE_ENV === 'production'

const clientConfig = () => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
  if (isProd) {
    plugins.push(new CleanWebpackPlugin())
    plugins.push(
      // auto generate service worker
      new SWPrecachePlugin({
        cacheId: 'blog',
        filename: 'service-worker.js',
        minify: true,
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'networkFirst'
          },
          {
            urlPattern: '/bar',
            handler: 'networkFirst'
          },
          {
            urlPattern: '/foo',
            handler: 'networkFirst'
          }
        ]
      })
    )
  }
  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      client: resolve('src/entry-client.js')
    },
    plugins,
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'all',
            minChunks: 2,
            maxInitialRequests: Infinity,
            minSize: 0,
            name: 'common'
          }
        }
      }
    }
  }
}

module.exports = merge(baseConfig(isProd), clientConfig())
