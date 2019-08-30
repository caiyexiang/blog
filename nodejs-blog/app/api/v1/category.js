const Router = require('koa-router')

const {
  CategoryValidator,
  ParamsIdValidator
} = require('../../validators/category')

const CategoryDao = require('../../dao/category')
const Auth = require('../../../middlewares/auth')
const { res } = require('../../../utils')

const router = new Router({
  prefix: '/v1'
})

router.post('/category', new Auth(Auth.ADMIN).m, async ctx => {
  const v = await new CategoryValidator().validate(ctx)
  await CategoryDao.createCategory(v)
  ctx.response.status = 201
  ctx.body = res.success('创建分类成功')
})

router.delete('/category/:id', new Auth(Auth.ADMIN).m, async ctx => {
  const v = await new ParamsIdValidator().validate(ctx)
  const id = v.get('path.id')
  await CategoryDao.destroyCategory(id)
  ctx.response.status = 200
  ctx.body = res.success('删除分类成功')
})

router.get('/category/:id', async ctx => {
  const v = await new ParamsIdValidator().validate(ctx)
  const id = v.get('path.id')
  const category = await CategoryDao.getCategory(id)
  ctx.response.status = 200
  ctx.body = res.json(category)
})

router.get('/category', async ctx => {
  const categoryList = await CategoryDao.getCategoryList()
  ctx.response.status = 200
  ctx.body = res.json(categoryList)
})

module.exports = router
