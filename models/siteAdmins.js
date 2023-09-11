const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const siteAdmins = new mongoose.Schema({
  name:String,
  email: String,
  password: String
});

siteAdmins.pre('save', async function(next){
    if(!this.isModified) return next()

    this.password = await bcrypt.hash(this.password, 12)
})

siteAdmins.methods.correctPassword =  async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword);
}


module.exports = mongoose.model("siteAdmins", siteAdmins);
