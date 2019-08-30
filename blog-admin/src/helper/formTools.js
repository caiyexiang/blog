export default {
  getRandomInt (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  },
  isLegalUsername (str) {
    let pattern = /^[0-9a-zA-Z]+$/
    return pattern.test(str)
  },
  isLegalEmail (str) {
    let pattern = new RegExp(
      '^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$',
      'g'
    )
    return pattern.test(str)
  },
  isLegalPassword (str) {
    let pattern = new RegExp(
      '^(?=.*[0-9])(?=.*[A-Za-z])[a-zA-Z0-9!@#$%^&*]{6,18}$',
      'g'
    )
    return pattern.test(str)
  }
}
