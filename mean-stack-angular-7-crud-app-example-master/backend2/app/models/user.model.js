const mongoose = require("mongoose");
var autoIncrementuser = require('mongoose-auto-increment');
 
autoIncrementuser.initialize(mongoose);

var userschema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  mobile: Number,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
})

userschema.plugin(autoIncrementuser.plugin, 'User');

const User = mongoose.model(
  "User", userschema
  
);

module.exports = User;
