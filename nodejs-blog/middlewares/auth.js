const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    this.level = level || 0
  }
  get r() {
    return async (ctx, next) => {
      const tokenToken = basicAuth(ctx.req)
      let scope = 0
      if(tokenToken && tokenToken.name) {
        try {
          var decode = jwt.verify(
            tokenToken.name,
            global.config.security.secretKey
          )
          scope = decode.scope
        } catch (error) {}
      }
      ctx.auth = { level: scope }
      await next()
    }
  }
  get m() {
    return async (ctx, next) => {
      const tokenToken = basicAuth(ctx.req)
      let errMsg = '无效的token'
      if (!tokenToken || !tokenToken.name) {
        errMsg = '需要携带token值'
        throw new global.errs.Forbidden(errMsg)
      }
      try {
        var decode = jwt.verify(
          tokenToken.name,
          global.config.security.secretKey
        )
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new global.errs.Forbidden(errMsg)
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new global.errs.Forbidden(errMsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
    }
  }
}

Auth.VISITOR = 0
Auth.USER = 1
Auth.ADMIN = 2
Auth.SPUSER_ADMIN = 3

module.exports = Auth
