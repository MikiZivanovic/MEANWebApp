const express = require("express");
const styleController = require("./../controllers/styleController");

const styleRouter = express.Router();

styleRouter
  .route("/")
  .get(styleController.getStyles)
  .post(styleController.postStyles);

module.exports = styleRouter;
