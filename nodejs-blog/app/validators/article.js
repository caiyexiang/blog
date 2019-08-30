const { Rule, LinValidator } = require('../../core/lin-validator-v2')

class ArticleValidator extends LinValidator {
  constructor() {
    super()
    this.title = [new Rule('isLength', 'title不能为空', { min: 1 })]
    this.cover = [new Rule('isLength', 'cover不能为空', { min: 1 })]
    this.content = [new Rule('isLength', 'content不能为空', { min: 1 })]
    this.category = [
      new Rule('isLength', 'category设置错误', { min: 24, max: 24 }),
      new Rule('matches', 'category设置错误', /^[a-z\d]+$/)
    ]
    this.scope = [new Rule('matches', 'scope设置错误', /^[0,1,2]$/)]
  }
  async validateCategory(vals) {
    const categoryId = vals.body.category
    const category = await Category.findOne({ _id: categoryId })
    if (!category) {
      throw new Error('暂无此分类ID')
    }
  }
}

class ArticleParamsValidator extends LinValidator {
  constructor() {
    super()
  }
  async validatePage(vals) {
    const page = vals.query.page
    if (page) {
      if (page <= 0 || page != parseInt(page)) {
        throw new Error('页数必须是正整数')
      }
    }
  }
  async validateCategory(vals) {
    const category = vals.query.category
    if (category) {
      if (category.length !== 24 || !/^[a-z\d]+$/.test(category)) {
        throw new Error('分类参数格式错误')
      }
    }
  }
}

class ParamsIdValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isLength', '没有找到相关文章', {
        min: 24,
        max: 24
      }),
      new Rule('matches', '没有找到相关文章', /^[a-z\d]+$/)
    ]
  }
}

module.exports = { ArticleValidator, ArticleParamsValidator, ParamsIdValidator }
