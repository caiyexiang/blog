const mongoose = require('mongoose')
const Schema = mongoose.Schema

// instance
const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      require: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categorys'
    },
    cover: {
      type: String
    },
    pv: {
      type: Number,
      default: 0
    },
    scope: {
      type: Number,
      default: 0
    },
    meta: {
      createdAt: {
        type: Date,
        default: Date.now()
      },
      updatedAt: {
        type: Date,
        default: Date.now()
      }
    }
  },
  { versionKey: false }
)

ArticleSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

module.exports = Article = mongoose.model('articles', ArticleSchema)
