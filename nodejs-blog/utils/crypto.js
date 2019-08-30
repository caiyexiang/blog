const bcrypt = require('bcryptjs')

const encryptPassword = text => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(text, salt)
  return hash
}

module.exports = encryptPassword
