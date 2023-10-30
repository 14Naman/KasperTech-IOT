const mongoose = require("mongoose");
const Room= require("../models/RoomModel");
const RoomSchema = new mongoose.Schema({
  roomid:{
    type:String,
    required:true,
  },
  userid:{
    type:String,
    required:true,
  },
  deviceid:{
    type:String,
    required:true,
  },
  name:{
    type:String,
    required:true,
  }
});

const UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
  userid:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  devices:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device", 
  }],
  rooms:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room", 
  }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
