const express = require('express');

const authContorler = require("../controllers/authController");

const userRouter = express.Router();
userRouter.route('/signup').post(authContorler.signup);
userRouter.route('/login').post(authContorler.login);
userRouter.route('/me').get(authContorler.getMe);
userRouter.route('/forgotPassword').post(authContorler.forgotPassword);
userRouter.route('/resetPassword/:token').patch(authContorler.resetPassword);





module.exports = userRouter;
