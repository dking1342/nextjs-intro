import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})

module.exports = mongoose.models?.Todo || mongoose.model("Todo", TodoSchema);
