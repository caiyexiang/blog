const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Auth = require('../../middlewares/auth')

// instance
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      default: Auth.ADMIN
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

module.exports = User = mongoose.model('users', UserSchema)
