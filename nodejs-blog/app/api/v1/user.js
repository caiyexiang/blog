const Router = require('koa-router')
const Auth = require('../../../middlewares/auth')
const UserDao = require('../../dao/user')
const LoginManager = require('../../service/login')
const { RegisterValidator, LoginValidator } = require('../../validators/user')
const { res } = require('../../../utils')

const router = new Router({
  prefix: '/v1/user'
})

router.post('/register', new Auth(Auth.ADMIN).m, async ctx => {
  const v = await new RegisterValidator().validate(ctx)
  await UserDao.createUser(v)
  ctx.response.status = 201
  ctx.body = res.success('注册成功')
})

router.post('/login', async ctx => {
  const v = await new LoginValidator().validate(ctx)
  let token = await LoginManager.userLogin(
    v.get('body.email'),
    v.get('body.password')
  )
  ctx.response.status = 200
  ctx.body = res.success('登陆成功')
  ctx.body.token = token
})

router.get('/info', new Auth(Auth.ADMIN).m, async ctx => {
  const id = ctx.auth.uid
  let userInfo = await UserDao.getUserInfo(id)
  ctx.response.status = 200
  ctx.body = res.json(userInfo)
})

module.exports = router
