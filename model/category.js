import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
  },
  { timeStamps: true }
)
export default mongoose.model('Category', categorySchema)
