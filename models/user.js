var mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    // id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: Organization,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
