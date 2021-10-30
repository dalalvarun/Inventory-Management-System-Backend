require("dotenv").config();
const Inventory = require("../models/Inventory");

exports.add = async (req, res, next) => {
  let result = await Inventory.findOne({ _id: req.body.id });
  if (result) {
    if (req.body.quantity <= result.workingQuantity) {
      result.workingQuantity -= req.body.quantity;
      result.defectiveQuantity += parseInt(req.body.quantity);
      result.save();
      return res.status(200).json({ message: "success" });
    }
  }
  return res.status(200).json({ message: "Inventory not found" });
};
