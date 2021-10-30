const Inventory = require("../models/Inventory");

exports.get = async (req, res) => {
  let working = 0,
    defective = 0;
  for await (const doc of Inventory.find()) {
    working += doc.workingQuantity;
    defective += doc.defectiveQuantity;
  }
  return res.status(200).json({
    working: working,
    defective: defective,
  });
};
