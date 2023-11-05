const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  author: String,
  categories: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Content", ContentSchema);
