const Style = require("../models/styleModel");

exports.getStyles = async (req, res) => {
  const styles = await Style.find();
  res.status(200).json({
    
    styles: styles,
  });
};
exports.postStyles = async (req, res, next) => {
  const newStyle = await Style.create(req.body);
  res.status(200).json({  data: { newStyle } });
};
