module.exports = {
  devServer: {
    port: 8080,
    open: false,
    overlay: {
      errors: true
    },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        pathRewrite: { '^/api': 'v1' },
        changeOrigin: true,
        logLevel: 'debug'
      }
    },
    historyApiFallback: true
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/global.scss";`
      }
    }
  }
};
