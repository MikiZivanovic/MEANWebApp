const express = require("express");
const varietyController = require("./../controllers/varietyController");

const varietyRouter = express.Router();

varietyRouter.route("/").get(varietyController.getVarieties);

module.exports = varietyRouter;
