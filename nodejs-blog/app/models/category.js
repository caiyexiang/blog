const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true,
      unique: true
    },
    meta: {
      createAt: {
        type: Date,
        default: Date.now()
      }
    }
  },
  { versionKey: false }
)

module.exports = Category = mongoose.model('categorys', CategorySchema)
