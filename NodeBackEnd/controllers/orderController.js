const Order = require("../models/orderModel");
const User = require("../models/userModel");
exports.postOrders = async (req, res, next) => {
  
    const newOrder = await Order.create({...req.body, user: req.user.id});
    console.log(newOrder);
    res.status(200).json({ status: "success", data: { newOrder } });
  
};
