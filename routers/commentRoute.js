const express = require("express");

const { addComment, getAllCommentsByPost, deleteComment } = require("../controllers/commentController");

// const {verifyToken} = require('../middlewares/verifyToken.js')

const Router = express.Router();

Router.route("/:postId").post(addComment).get(getAllCommentsByPost);
Router.route("/:commentId").delete(deleteComment)

module.exports = Router;
