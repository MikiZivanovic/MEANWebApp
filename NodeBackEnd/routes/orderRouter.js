const express = require("express");
const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");

const orderRouter = express.Router();

orderRouter.route("/").post(authController.protect,orderController.postOrders);

module.exports = orderRouter;
