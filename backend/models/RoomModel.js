const mongoose = require("mongoose");
const { Schema } = mongoose;
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
    type: Schema.Types.ObjectId,
    ref: "Device",
  },
  name:{
    type:String,
    required:true,
  }
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
