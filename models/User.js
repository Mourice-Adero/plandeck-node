const mongoose = require("mongoose");

const userScehma = new mongoose.Schema({
  username: string,
  fullName: string,
  email: string,
  password: string,
});

module.exports = mongoose.model("User", userScehma);
