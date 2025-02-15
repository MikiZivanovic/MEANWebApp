const express = require("express");
const wineController = require("./../controllers/wineController");
const authController = require("./../controllers/authController");
const wineRouter = express.Router();

wineRouter
  .route("/")
  .get(wineController.getWines)
  .post(
    authController.protect,
    authController.permision("admin"),
    wineController.uploadWineImages,
    wineController.postWines,
    wineController.resizeWineImages
  );
wineRouter
  .route("/:id")
  .get(wineController.getWine)
  

module.exports = wineRouter;
