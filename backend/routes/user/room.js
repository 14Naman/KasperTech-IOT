const express = require("express");
const Admin = require("../../models/AdminModel");
const mongoose = require("mongoose");
const Room= require("../../models/RoomModel");
const router = express.Router();
const User = require("../../models/UserModel");
const Device=require("../../models/DeviceModel");
var usedNumbers = new Set();
const nodemailer = require("nodemailer");
// Create a transporter with your email service credentials
function generateUniqueNumber(min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  if (usedNumbers.has(randomNumber)) {
    // Number has already been generated, generate a new one recursively
    return generateUniqueNumber(min, max);
  } else {
    usedNumbers.add(randomNumber);
    return randomNumber;
  }
}
router.post("/login",async(req,res)=>{
    try{
    const {userid,password}= req.body;
    const user =await User.findOne({userid:userid,password:password});
    if(!user){
        res.status(400).json({message:"Not found"});
    } 
    res.status(200).json({message:"Found"});
}catch(err){
    res.status(500).json({message:"Server error"});
}
})
router.post("/new-room",async(req,res)=>{
    try{
    const {userid,name}= req.body;
    console.log(userid);
    const nroom= new Room({
        roomid:generateUniqueNumber(1000000000, 9999999999),
        userid:userid,
        deviceid:null,
        name:name
    })
    await nroom.save();
    await User.findOneAndUpdate({userid:userid},{$push:{rooms:nroom._id}});
    res.status(200).json({message:"Success"});
}catch(err){
    console.log(err);
    res.status(500).json({message:"Server error"});
}
})
router.post("/allot-device",async(req,res)=>{
    try{
    const {roomid,deviceid}= req.body;
    // const device= await Room.findOneAndUpdate({roomid:roomid});
    // if(device.deviceid!=null){
    //     return res.status(500).json({message:"Already Alloted Device"});
    // }
    const room= await Room.findOne({roomid:roomid});
    const device= await Device.findOne({deviceid:deviceid});
    if(device.deviceid!=null){
        return res.status(400).json({message:"This device is already allocated"});
    }
    await Device.findOneAndUpdate({deviceid:deviceid},{roomid:room._id});
    await Room.findOneAndUpdate({roomid:roomid},{deviceid:device._id});
    res.status(200).json({message:"Success"});
}catch(err){
    console.log(err);
    res.status(500).json({message:"Server error"});
}
})
router.post("/change-state",async(req,res)=>{
    try{
    const {deviceid,state}= req.body;
    await Device.findOneAndUpdate({deviceid:deviceid},{state:state});
    res.status(200).json({message:"Success"});
}catch(err){
    res.status(500).json({message:"Server error"});
}
})
router.get("/rooms",async(req,res)=>{
    try{
    const userid= req.query.userid;
    const users= await User.findOne({userid:userid}).populate({path: 'rooms',
    populate: {
      path: 'deviceid',
      model: 'Device'
    }});
    res.status(200).json({rooms:users.rooms});
}catch(err){
    res.status(500).json({message:"Server error"});
}
});
router.get("/devices",async(req,res)=>{
    try{
    const userid= req.query.userid;
    const users= await User.findOne({userid:userid}).populate({
        path: 'devices',
        populate: {
          path: 'roomid',
          model: 'Room'
        }
      });
    res.status(200).json({devices:users.devices});
}catch(err){
    console.log(err);
    res.status(500).json({message:"Server error"});
}
});
module.exports = router;
