require("dotenv").config();
const Inventory = require("../models/Inventory");
const Transaction = require("../models/transactions");

exports.add = async (req, res, next) => {
  const { inventory } = req.body;
  let result = await Inventory.findOne({ _id: inventory });
  if (result) {
    result.workingQuantity -= req.body.assignedQty;
    result.defectiveQuantity += parseInt(req.body.assignedQty);
    result.save();
    Transaction.create(req.body);
    return res.status(200).json({ message: "success" });
  } else {
    return res.status(200).json({ error: "err.message" });
  }
};

exports.all = async (req, res, next) => {
  let result = [];
  for await (const doc of Transaction.find()) {
    result.push(doc);
  }
  return res.status(200).json(result);
};
exports.return = async (req, res, next) => {
  let { id } = req.body;
  try {
    let result = await Transaction.findById(id);
    result.status = "Returned";
    result.returnedOn = new Date();
    result.save();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
};
