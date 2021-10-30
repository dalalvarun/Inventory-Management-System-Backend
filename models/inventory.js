var mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    workingQuantity: {
      type: Number,
      required: true,
    },
    defectiveQuantity: {
      type: Number,
      required: true,
    },
    assignedQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
