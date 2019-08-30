const mongoose = require('mongoose')
const Schema = mongoose.Schema

// instance
const CommentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: 'articles',
      required: true
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'comments',
      required: false
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

module.exports = Comment = mongoose.model('comments', CommentSchema)
