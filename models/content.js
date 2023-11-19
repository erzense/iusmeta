const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  author: String,
  categories: String,
  summarize: {
    type: String,
    virtual: true,
    get: function () {
      return this.content.substr(0, 150);
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Content", ContentSchema);
