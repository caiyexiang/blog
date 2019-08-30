const UserDao = require('../dao/user')
const { generateToken } = require('../../utils')

class LoginManager {
  // 管理员登录
  static async userLogin(email, password) {
    // 验证账号密码是否正确
    const user = await UserDao.verifyEmailPassword(email, password)
    return generateToken(user.id, user.level)
  }
}

module.exports = LoginManager
