const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.addComment = async (req, res, next) => {
  try {
    const postId = req.params.postId; // Lấy postId từ URL hoặc từ body request

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Bài viết không tồn tại",
      });
    }

    const newComment = new Comment({
      content: req.body.content,
      author: req.body.author,
      post: post._id,
    });

    const savedComment = await newComment.save();

    post.comments.push(savedComment._id);
    await post.save();

    res.status(201).json({
      status: "success",
      data: {
        comment: savedComment,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getAllCommentsByPost = async (req, res, next) => {
  try {
    const postId = req.params.postId; // Lấy postId từ URL hoặc từ body request

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Bài viết không tồn tại",
      });
    }

    const comments = await Comment.find({ post: postId });

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: {
        comments,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteComment = async (req, res, next) => {
  try { 
    const commentId = req.params.commentId; // Lấy commentId từ URL hoặc từ body request

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        status: "fail",
        message: "Bình luận không tồn tại",
      });
    }

    const postId = comment.post; // Lấy postId từ bình luận

    await Comment.findByIdAndDelete(commentId);

    const post = await Post.findById(postId);
    // Xóa commentId khỏi danh sách bình luận của bài viết
    post.comments = post.comments.filter((id) => id.toString() !== commentId);
    await post.save();

    res.status(200).json({
      status: "success",
      message: "Bình luận đã được xóa",
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
