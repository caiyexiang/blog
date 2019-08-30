import formTools from './formTools'

export default {
  validateEmail (rule, value, callback) {
    if (!value) {
      callback(new Error('邮箱不能为空'))
    } else if (!formTools.isLegalEmail(value)) {
      callback(new Error('请输入合法的邮箱'))
    } else {
      callback()
    }
  },
  validatePassword (rule, value, callback) {
    if (!value) {
      callback(new Error('请输入密码'))
    } else if (!formTools.isLegalPassword(value)) {
      callback(new Error('密码必须是6-18位以上长度数字字母符号组合'))
    } else {
      callback()
    }
  },
  validateNotEmpty (rule, value, callback) {
    if (!value) {
      callback(new Error('该项是必填项'))
    } else {
      callback()
    }
  },
  validateScope (rule, value, callback) {
    if (isNaN(value) || value < 0 || value > 2) {
      callback(new Error('scope非法'))
    } else {
      callback()
    }
  }
}
