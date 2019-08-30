const Router = require('koa-router')
const requireDirectory = require('require-directory')
const mongoose = require('mongoose')

class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.loadRouters()
    InitManager.loadHttpException()
    InitManager.loadConfig()
    InitManager.loadDB()
  }

  static loadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`
    const whenLoadModule = obj => {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }

  static loadDB() {
    const mongonURI = global.config.mongonURI
    mongoose
      .connect(mongonURI, {
        useNewUrlParser: true
      })
      .then(() => {
        console.log('mongodb connected')
      })
      .catch(err => {
        console.error('mongodb connection failed:', err)
      })
    mongoose.set('useCreateIndex', true)
  }
}

module.exports = InitManager
