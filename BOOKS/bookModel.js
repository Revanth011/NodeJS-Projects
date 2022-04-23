const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Book Title Required"],
  },
  description: {
    type: String,
    minLength: 5,
    maxLength: 50,
  },
});
module.exports = mongoose.model("Book", BookSchema);
