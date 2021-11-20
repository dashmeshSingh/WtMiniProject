const mongoose = require("mongoose");
var autoIncrementuser = require('mongoose-auto-increment');
 
autoIncrementuser.initialize(mongoose);

var userschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
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

userschema.plugin(autoIncrementuser.plugin, {
  model: 'User',
  field: '_id',
  startAt: 201
});

const User = mongoose.model(
  "User", userschema
  
);

module.exports = User;
