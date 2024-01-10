const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dateCreate: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  content: {
    type: String,
    required: [true, 'Yêu cầu nội dung'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Yêu cầu tác giả'],
    trim: true
  }
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);
module.exports = News;