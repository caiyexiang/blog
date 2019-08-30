const Router = require('koa-router')

const {
  ArticleValidator,
  ParamsIdValidator,
  ArticleParamsValidator
} = require('../../validators/article')

const Auth = require('../../../middlewares/auth')
const ArticleDao = require('../../dao/article')
const CategoryDao = require('../../dao/category')
const CommentDao = require('../../dao/comment')
const { res } = require('../../../utils')

const router = new Router({
  prefix: '/v1'
})

/**
 * 目前只有Article在ADMIN权限下的操作,因此无需验证用户id是否为作者id
 */

router.post('/article', new Auth(Auth.ADMIN).m, async ctx => {
  const v = await new ArticleValidator().validate(ctx)
  if (ctx.auth.scope < v.get('body.scope')) {
    throw new global.errs.ParameterException('scope设置权限过高')
  }
  await ArticleDao.createArticle(v, ctx.auth.uid)
  ctx.response.status = 201
  ctx.body = res.success('创建文章成功')
})

router.delete('/article/:id', new Auth(Auth.ADMIN).m, async ctx => {
  const v = await new ParamsIdValidator().validate(ctx)
  const id = v.get('path.id')
  await ArticleDao.destroyArticle(id)
  ctx.response.status = 200
  ctx.body = res.success('删除文章成功')
})

router.patch('/article/:id', new Auth(Auth.ADMIN).m, async ctx => {
  const v = await new ParamsIdValidator().validate(ctx)
  const id = v.get('path.id')
  await ArticleDao.updateArticle(id, v)
  ctx.response.status = 200
  ctx.body = res.success('更新文章成功')
})

router.get('/article', async ctx => {
  const v = await new ArticleParamsValidator().validate(ctx)
  const page = v.get('query.page')
  const desc = v.get('query.desc')
  const category = v.get('query.category')
  const keyword = v.get('query.keyword')
  const articleList = await ArticleDao.getArticleList(
    page,
    desc,
    category,
    keyword
  )
  ctx.response.status = 200
  ctx.body = res.json(articleList)
})

router.get('/article/:id', new Auth(Auth.VISITOR).r, async ctx => {
  const v = await new ParamsIdValidator().validate(ctx)
  const id = v.get('path.id')
  const article = await ArticleDao.getArticleDetail(id, ctx.auth.level)
  const category = await CategoryDao.getCategory(article.category)
  const comments = await CommentDao.getArticleComments(id)
  await ArticleDao.updateArticlePv(id, ++article.pv)
  const { _id, content, title, cover, author, pv, scope } = article
  ctx.response.status = 200
  ctx.body = res.json({
    _id,
    content,
    title,
    cover,
    author,
    pv,
    scope,
    category,
    comments
  })
})

module.exports = router
