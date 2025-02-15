const Style = require("../models/styleModel");

exports.getStyles = async (req, res) => {
  const styles = await Style.find();
  res.status(200).json({
    status: "succes",
    styles: styles,
  });
};
exports.postStyles = async (req, res, next) => {
  const newStyle = await Style.create(req.body);
  res.status(200).json({ status: "succes", data: { newStyle } });
};
