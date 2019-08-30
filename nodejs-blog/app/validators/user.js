const { Rule, LinValidator } = require('../../core/lin-validator-v2')
const User = require('../models/user')

class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')]
    this.password = [
      // 用户密码指定范围
      new Rule('isLength', '密码至少6个字符，最多22个字符', {
        min: 6,
        max: 30
      }),
      new Rule(
        'matches',
        '密码长度必须在6~22位之间，包含字符、数字和 _ ',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      )
    ]
    this.password2 = this.password
    this.name = [
      new Rule('isLength', '昵称长度必须在2~16之间', {
        min: 2,
        max: 16
      })
    ]
  }
  validatePassword(val) {
    const pwd = val.body.password
    const pwd2 = val.body.password2
    if (pwd !== pwd2) {
      throw new Error('两次输入的密码不一致，请重新输入')
    }
  }
  async validateEmail(val) {
    const email = val.body.email
    const user = await User.findOne({ email })
    if (user) {
      throw new Error('邮箱已被注册，请重新输入邮箱')
    }
  }
  async validateName(val) {
    const name = val.body.name
    const user = await User.findOne({ name })
    if (user) {
      throw new Error('用户名已被注册，请重新输入用户名')
    }
  }
}

class LoginValidator extends LinValidator {
  constructor() {
    super()
    this.email = [new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')]
    this.password = [
      // 用户密码指定范围
      new Rule('isLength', '密码至少6个字符，最多22个字符', {
        min: 6,
        max: 22
      }),
      new Rule(
        'matches',
        '密码长度必须在6~22位之间，包含字符、数字和 _ ',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      )
    ]
  }
}

module.exports = { RegisterValidator, LoginValidator }
