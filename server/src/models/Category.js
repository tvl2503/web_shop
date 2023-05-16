const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {type: String, require: true, unique: true, trim: true,},
    path: {type: String, require: true, unique: true, trim: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
