var mongoose = require("mongoose");
var Inventory = require("./Inventory");

const transactionsSchema = mongoose.Schema(
  {
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: Inventory,
    },
    assignedQty: {
      type: Number,
      required: true,
    },
    assignedTo: {
      type: "String",
      required: true,
    },
    assignedOn: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Assigned", "Returned"],
      default: "Assigned",
    },
    returnedOn: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Transactions = mongoose.model("Transaction", transactionsSchema);

module.exports = Transactions;
