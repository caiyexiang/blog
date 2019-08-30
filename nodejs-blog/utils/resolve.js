class Resolve {
  success(msg = 'success', errorCode = 0, code = 200) {
    return {
      msg,
      code,
      errorCode
    }
  }
  json(data, msg = 'success', errorCode = 0, code = 200) {
    return {
      code,
      msg,
      errorCode,
      data
    }
  }
}

const res = new Resolve()

module.exports = res
