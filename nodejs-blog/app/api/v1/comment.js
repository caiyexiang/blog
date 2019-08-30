const Router = require('koa-router')
const Auth = require('../../../middlewares/auth')
const CommentDao = require('../../dao/comment')
const {
  CommentValidator,
  ParamsIdValidator,
  CommentParamsValidator
} = require('../../validators/comment')
const { res } = require('../../../utils')

const router = new Router({
  prefix: '/v1'
})

router.post('/comment', async ctx => {
  const v = await new CommentValidator().validate(ctx)
  const r = await CommentDao.createComment(v)
  ctx.response.status = 201
  ctx.body = res.json(r)
})

router.delete('/comment/:id', new Auth(Auth.ADMIN).m, async ctx => {
  const v = await new ParamsIdValidator().validate(ctx)
  const id = v.get('path.id')
  await CommentDao.destroyComment(id)
  ctx.response.status = 200
  ctx.body = res.success('删除评论成功')
})

router.patch('/comment/:id', new Auth(Auth.ADMIN).m, async ctx => {
  const v = await new ParamsIdValidator().validate(ctx)
  const id = v.get('path.id')
  await CommentDao.updateComment(id, v)
  ctx.response.status = 200
  ctx.body = res.success('更新评论成功')
})

router.get('/comment', async ctx => {
  const page = ctx.query.page
  let commentList = await CommentDao.getCommentList(page)
  ctx.response.status = 200
  ctx.body = res.json(commentList)
})

router.get('/comment/:id', async ctx => {
  const v = await new ParamsIdValidator().validate(ctx)
  const id = v.get('path.id')
  let comment = await CommentDao.getComment(id)
  ctx.response.status = 200
  ctx.body = res.json(comment)
})

router.get('/article/:id/comments', async ctx => {
  const v = await new ParamsIdValidator().validate(ctx)
  const articleId = v.get('path.id')
  const vQuery = await new CommentParamsValidator().validate(ctx)
  const page = vQuery.get('query.page')
  const desc = vQuery.get('query.desc')
  const commentsList = await CommentDao.getArticleComments(
    articleId,
    page,
    desc
  )
  ctx.response.status = 200
  ctx.body = res.json(commentsList)
})

module.exports = router
