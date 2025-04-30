const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  imageURL: {
    type: String,
    //  required: true
  },
  isAdmin: {
    type: Boolean,
    //        required: true
  },
  passwordHash: {
    type: String,
    //  required: true
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
