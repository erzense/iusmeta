const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  image: String,
  position: String,
  linkedin: String,
});

module.exports = mongoose.model("User", UserSchema);
