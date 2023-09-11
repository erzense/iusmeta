const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: String,
  position: String,
  linkedin: String,
  image: String,
  cv:String
});


module.exports = mongoose.model("Admins", AdminSchema);
