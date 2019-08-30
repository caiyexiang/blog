const { Rule, LinValidator } = require('../../core/lin-validator-v2')

class CommentValidator extends LinValidator {
  constructor() {
    super()
    this.name = [new Rule('isLength', '评论人名字不能为空', { min: 1 })]
    this.email = [new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')]
    this.content = [new Rule('isLength', '评论内容名字不能为空', { min: 1 })]
    this.article = [
      new Rule('isLength', '文章ID长度错误', {
        min: 24,
        max: 24
      }),
      new Rule('matches', '文章ID格式错误', /^[a-z\d]+$/)
    ]
  }
  async validateParent(vals) {
    const parent = vals.body.parent
    if (parent) {
      if (parent.length !== 24 || !/^[a-z\d]+$/.test(parent)) {
        throw new Error('父评论ID格式错误')
      }
    }
  }
}

class ParamsIdValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isLength', '评论ID长度错误', {
        min: 24,
        max: 24
      }),
      new Rule('matches', '评论ID格式错误', /^[a-z\d]+$/)
    ]
  }
}

class CommentParamsValidator extends LinValidator {
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
}

module.exports = {
  CommentValidator,
  ParamsIdValidator,
  CommentParamsValidator
}
