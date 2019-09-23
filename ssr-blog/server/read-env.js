const fs = require('fs')
const path = require('path')

module.exports = fileName => {
  const filePath = path.join(__dirname, fileName)
  const file = fs.readFileSync(filePath, { encoding: 'utf8' })
  const data = file
    .split('\n')
    .filter(Boolean)
    .reduce((obj, item) => {
      const [key, val] = item.split('=')
      obj[key] = val
      return obj
    }, {})
  return data
}
