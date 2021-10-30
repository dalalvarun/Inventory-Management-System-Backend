const Inventory = require("../models/Inventory");

exports.add = async (req, res) => {
  const { name, quantity, status } = req.body;
  let existingInventory = await Inventory.findOne({ name });
  if (existingInventory) {
    if (status === "WORKING") existingInventory.workingQuantity += quantity;
    else existingInventory.defectiveQuantity += quantity;
    existingInventory;
    existingInventory.save();
  } else {
    if (status === "WORKING")
      Inventory.create({
        name,
        workingQuantity: quantity,
        defectiveQuantity: 0,
      });
    else
      Inventory.create({
        name,
        workingQuantity: 0,
        defectiveQuantity: quantity,
      });
  }
  return res.status(200).json({ message: "Inventory Added" });
};

exports.get = async (req, res) => {
  let result = [];
  for await (const doc of Inventory.find()) {
    result.push(doc);
  }
  return res.status(200).json({ result });
};

// exports.assign = async (req, res) => {
//   const { id, quantity } = req.body;
//   let result = await Inventory.findOne({ _id: id });
//   result.workingQuantity -= quantity;
// };

exports.getByID = async (req, res) => {
  let result = await Inventory.findById(req.body.id);
  if (result) {
    let name = result.name;
    return res.status(200).json({ name });
  } else return res.status(200).json({ message: "not found" });
  // return res.status(200).json({'name':result.})
};
