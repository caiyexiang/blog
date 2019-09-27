const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = dir => path.join(__dirname, '..', dir)

const baseConfig = isProd => {
  const scriptLoader = {
    loader: 'babel-loader',
    options: {
      exclude: ['./node_modules/'],
      include: [resolve('src')]
    }
  }
  const urlLoader = {
    loader: 'url-loader',
    options: {
      name: 'assets/[name]-[hash:5].[ext]',
      limit: 2000
    }
  }
  const cssLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  }
  const styleLoader = { loader: 'vue-style-loader' }
  const sassLoader = {
    loader: 'sass-loader',
    options: {
      implementation: require('sass')
    }
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [require('autoprefixer')]
    }
  }
  const vueLoader = {
    loader: 'vue-loader',
    options: {
      extractCSS: isProd
    }
  }
  const sassResourseLoader = {
    loader: 'sass-resources-loader',
    options: {
      resources: [resolve('src/assets/scss/global.scss')]
    }
  }

  return {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
      path: resolve('dist'),
      publicPath: '/dist/',
      filename: '[name]-[chunkhash].bundle.js',
      chunkFilename: '[name]-[chunkhash].chunk.js'
    },
    module: {
      rules: [
        { test: /\.js$/, use: [scriptLoader] },
        {
          test: /\.css$/,
          use: [styleLoader, cssLoader, postcssLoader]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            styleLoader,
            cssLoader,
            postcssLoader,
            sassLoader,
            sassResourseLoader
          ]
        },
        { test: /\.(eot|woff2?|ttf)$/, use: [urlLoader] },
        { test: /\.(jpg|png|jpeg|gif|svg)$/, use: [urlLoader] },
        { test: /\.vue$/, use: [vueLoader] }
      ]
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: isProd
      ? [
          new VueLoaderPlugin(),
          new ExtractTextPlugin({ filename: 'common.[chunkhash].css' })
        ]
      : [new VueLoaderPlugin()]
  }
}

module.exports = isProd => baseConfig(isProd)
