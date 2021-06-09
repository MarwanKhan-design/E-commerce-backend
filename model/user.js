import mongoose from 'mongoose'
import crypto from 'crypto'
import { v1 as uuidv1 } from 'uuid'
import { timeStamp } from 'console'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

// virtual Fields

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = encryptPassword(password)
  })
  .get(function () {
    this._password
  })

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
}
export default mongoose.model('User', userSchema)
