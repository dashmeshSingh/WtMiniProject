const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
 
autoIncrement.initialize(mongoose);

var leaveschema = new mongoose.Schema({
  username: String,
  leavetype: String,
  startdate: Date,
  enddate: Date,
  status: Number,

  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});

leaveschema.plugin(autoIncrement.plugin,{
  model: 'Leave',
  field: '_id',
  startAt: 501
});


const Leave = mongoose.model(
  "Leave",leaveschema
  
);

module.exports = Leave;
