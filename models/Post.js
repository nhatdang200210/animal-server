const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,},
  content: {
    type: String,
    required: [true, 'Yêuu cầu nhập nội dung'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Yêu cầu nhập tiêu đề'],
    trim: true
  },
  attachment: {
    type: String,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  }

}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;