const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Cần nhập nội dung'],
    trim: true
  },
  // author: {
  //   type: String,
  //   required: [true, 'Cần '],
  //   trim: true
  // },
  createdAt: {
    type: Date,
    default: Date.now
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;