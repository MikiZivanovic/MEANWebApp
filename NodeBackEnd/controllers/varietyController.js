const Variety = require("../models/varietyModel");

exports.getVarieties = async (req, res) => {
  const varietis = await Variety.find();
  res.status(200).json({
    
    varities: varietis,
  });
};
exports.posVarieties = async (req, res, next) => {
  const newVariety = await Variety.create(req.body);
  res.status(200).json({ status: "success", data: { newVariety } });
};
