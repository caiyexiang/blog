const Article = require('../models/article')
const Category = require('../models/category')

class ArticleDao {
  static async createArticle(v, authorId) {
    const article = new Article()
    article.title = v.get('body.title')
    article.author = authorId
    article.content = v.get('body.content')
    article.category = v.get('body.category')
    article.cover = v.get('body.cover')
    article.scope = v.get('body.scope')
    article.save()
  }
  static async destroyArticle(id) {
    const article = await Article.findById(id)
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章')
    }
    article.remove()
  }
  static async updateArticle(id, v) {
    const article = await Article.findById(id)
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章')
    }
    article.title = v.get('body.title')
    article.content = v.get('body.content')
    article.cover = v.get('body.cover')
    article.category = v.get('body.category')
    article.scope = v.get('body.scope')
    article.save()
  }
  static async updateArticlePv(id, pv) {
    const article = await Article.findById(id)
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章')
    }
    article.pv = pv
    article.save()
  }
  static async getArticleDetail(id, level) {
    const article = await Article.findById(id)
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章')
    }
    if(article.scope > 0 && article.scope > level) {
      throw new global.errs.NotFound('没有找到相关文章')
    }
    return article
  }
  static async getArticleList(page = 1, desc = '_id', category, keyword) {
    const pageSize = 10
    let filter = {}
    if (category) {
      filter.category = category
    }
    if (keyword) {
      filter.title = {
        $regex: new RegExp(keyword, 'i') // 不区分大小写
      }
    }
    const article = await Article.find(filter)
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select(['-content'])
      .lean()
    const allArticlesCount = await Article.find(filter).countDocuments()
    for (let a of article) {
      const categoryResult = await Category.findById(a.category)
      const authorResult = await User.findById(a.author)
      const commentResult = await Comment.find({ article: a }).countDocuments()
      a.category = categoryResult ? categoryResult.name : ''
      a.author = authorResult ? authorResult.name : ''
      a.comments_num = commentResult
    }
    return {
      data: article,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: allArticlesCount,
        total: allArticlesCount,
        total_pages: Math.ceil(allArticlesCount / 10)
      }
    }
  }
}

module.exports = ArticleDao
