const express = require('express');
const {login,register, getListUser, lock, unlock} = require('../controllers/authController.js');
// const { checkCurrentUser } = require('../middlewares/checkCurrentUser.js');

const Router = express.Router();

Router.route('/register').post(register);
Router.route('/login').post(login);
Router.route('/users').get(getListUser);
//Khoá tk theo userId
Router.put('/users/:userId/lock', lock);
Router.put('/users/:userId/unlock', unlock);

module.exports = Router;