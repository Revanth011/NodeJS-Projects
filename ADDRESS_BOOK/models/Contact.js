const mongoose = require("mongoose");
const validator = require("validator");
const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Contact Name Required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      validate(Email) {
        if (!validator.isEmail(Email)) throw new Error("Invalid Contact Email");
      },
    },
    address: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    phoneNo: {
      type: Number,
      required: true,
      maxlength: 15,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Contact", ContactSchema);
