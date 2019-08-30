const { Rule, LinValidator } = require('../../core/lin-validator-v2')

class CategoryValidator extends LinValidator {
  constructor() {
    super()
    this.name = [new Rule('isLength', '分类名字不能为空', { min: 1 })]
    this.key = [new Rule('isLength', '分类关键字不能为空', { min: 1 })]
  }
}

class ParamsIdValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isLength', '没有相关分类', {
        min: 24,
        max: 24
      }),
      new Rule('matches', '没有相关分类', /^[a-z\d]+$/)
    ]
  }
}

module.exports = {
  CategoryValidator,
  ParamsIdValidator
}
