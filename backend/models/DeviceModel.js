const mongoose = require("mongoose");
const User= require("../models/UserModel");
const { Schema } = mongoose;
const DeviceSchema = new mongoose.Schema({
  deviceid:{
    type:String,
    required:true,
  },
  allotedto:{
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  roomid:{
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
  state:{
    type: {
      light: Number,
      fan: Number,
      misc: Number,
    },
    default: {
      light: 0,
      fan: 0,
      mis: 0
    }
  }
});

const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;
