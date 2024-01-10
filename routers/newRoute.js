const express = require('express');

const {getNews, createNew, updateNew, deleteNew} = require( '../controllers/newController');

const Router = express.Router();

Router.route('/').get(getNews).post(createNew); 
Router.route('/:newId').put(updateNew).delete(deleteNew)

module.exports = Router;