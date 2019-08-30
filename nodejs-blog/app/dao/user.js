const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { encryptPassword } = require('../../utils')

class UserDao {
  static async createUser(v) {
    const checkEmail = await User.findOne({ email: v.get('body.email') })
    const checkName = await User.findOne({ name: v.get('body.name') })
    if (checkEmail || checkName) {
      throw new global.errs.Existing('用户已被注册')
    }
    const user = new User({
      name: v.get('body.name'),
      email: v.get('body.email'),
      password: encryptPassword(v.get('body.password2'))
    })
    user.save()
  }

  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({ email })
    if (!user) {
      throw new global.errs.AuthFailed('账号不存在')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }
    return user
  }

  static async getUserInfo(id) {
    const user = await User.findOne({ _id: id })
    if (!user) {
      throw new global.errs.AuthFailed('账号不存在')
    }
    const { email, name, level } = user
    return { email, name, level }
  }
}

module.exports = UserDao
