const express = require('express');

const {getPosts, createPost, updatePost, deletePost, approvePost, getApprovedPosts } = require( '../controllers/postController');

// const {verifyToken} = require('../middlewares/verifyToken.js')

const Router = express.Router();

Router.route('/').get(getPosts).post(createPost);
Router.put('/approve/:postId', approvePost); // route duyệt bài viết
Router.get('/approved', getApprovedPosts);
Router.route('/:postId').put(updatePost).delete(deletePost);

module.exports = Router;