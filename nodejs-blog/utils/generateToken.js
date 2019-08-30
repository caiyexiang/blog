const jwt = require('jsonwebtoken')
const { Base64 } = require('js-base64')

const generateToken = function(uid, scope) {
  const secretKey = global.config.security.secretKey
  const expiresIn = global.config.security.expiresIn
  const token = jwt.sign(
    {
      uid,
      scope
    },
    secretKey,
    {
      expiresIn: expiresIn
    }
  )
  const base64 = Base64.encode(token + ':')
  return 'Basic ' + base64
}

module.exports = generateToken
