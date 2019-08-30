const Comment = require('../models/comment')
const Article = require('../models/article')

class CommentDao {
  static async createComment(v) {
    const article = await Article.findById(v.get('body.article'))
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章')
    }
    const comment = new Comment()
    comment.name = v.get('body.name')
    comment.email = v.get('body.email')
    comment.content = v.get('body.content')
    comment.article = v.get('body.article')
    let parent = v.get('body.parent')
    if(parent) comment.parent = v.get('body.parent')
    return comment.save()
  }
  static async destroyComment(id) {
    const comment = await Comment.findById(id)
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论')
    }
    comment.remove()
  }
  static async getComment(id) {
    const comment = await Comment.findById(id)
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论信息')
    }
    return comment
  }
  static async updateComment(id, v) {
    const comment = await Comment.findById(id)
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论信息')
    }
    comment.name = v.get('body.name')
    comment.email = v.get('body.email')
    comment.content = v.get('body.content')
    comment.save()
  }
  static async getCommentList(page = 1) {
    const pageSize = 10
    const commnet = await Comment.find()
      .sort({ createAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean()
    const allCommentsCount = await Comment.find().countDocuments()
    return {
      data: commnet,
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: allCommentsCount,
        total: allCommentsCount,
        total_pages: Math.ceil(allCommentsCount / 10)
      }
    }
  }
  static async getArticleComments(article, page = 1, desc = 'createdAt') {
    const pageSize = 10
    const commnet = await Comment.find({ article })
      .sort({ createdAt: -1 }) // 目前没有需求更改排序规则
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select(['-email'])
      .lean()
    const allCommentsCount = await Comment.find({ article }).countDocuments()
    return {
      data: commnet,
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: allCommentsCount,
        total: allCommentsCount,
        total_pages: Math.ceil(allCommentsCount / 10)
      }
    }
  }
}

module.exports = CommentDao
