const Koa = require('koa')
const InitManager = require('./core/init')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const {accessLogger, systemLogger} = require('./log4')
const catchError = require('./middlewares/exception')

const app = new Koa()
app.use(accessLogger())
app.use(cors())
app.use(catchError)
app.use(bodyParser())

InitManager.initCore(app)

app.on('error', err=>{systemLogger.error(err)})
app.listen(5000)
