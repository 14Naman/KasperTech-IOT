const express = require("express");
const mongoose = require("mongoose");
const Admin = require("../../models/AdminModel");
const router = express.Router();
const User = require("../../models/UserModel");
const Device=require("../../models/DeviceModel");
var usedNumbers = new Set();
const nodemailer = require("nodemailer");
// Create a transporter with your email service credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pulse7561@gmail.com",
    pass: "fkfzrtomrjweslkd",
  },
});
const sendLoginEmail = async (email, adminId, password) => {
  try {
    // Create the email content
    const mailOptions = {
      from: "puneetgoyal539@gmail.com",
      to: email,
      subject: "Successful Login",
      text: `Congratulations! You have successfully logged in.\n\nYour credentials:\Userid: ${adminId}\nPassword: ${password}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
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
    const {adminId,password}= req.body;
    const user= await Admin.findOne({adminId:adminId,password:password});
    if(!user){
        res.status(400).json({message:"Not found"});
    } 
    res.status(200).json({message:"Found"});
}catch(err){
    res.status(500).json({message:"Server error"});
}
});

router.post("/new-user",async(req,res)=>{
    try{
    const {email,password}= req.body;
    const userid=generateUniqueNumber(1000000000, 9999999999);
    const nuser= new User({
        email:email,
        userid:userid,
        password:password,
        rooms:[]
    });
    sendLoginEmail(email,userid,password);
    await nuser.save();
    res.status(200).json({message:"Success"});
}catch(err){
    res.status(500).json({message:"Server error"});
}
});
router.post("/allot-device",async(req,res)=>{
    try{
    let {deviceid,userid}= req.body;
    userid= new mongoose.Types.ObjectId(userid);
    const device= await Device.findOne({deviceid:deviceid});
    if(device.allotedto!=null){
      res.status(500).json({message:"Already alloted Device"});
      return;
    }
    // deviceid=new mongoose.Types.ObjectId(device.)
    await Device.findOneAndUpdate({deviceid:deviceid},{allotedto:userid});
    await User.findByIdAndUpdate({_id:userid},{$push:{devices:device._id}});
    res.status(200).json({message:"Success"});
}catch(err){
  console.log(err);
    res.status(500).json({message:"Server error"});
}
});


router.post("/add-device",async(req,res)=>{
    try{
    const ndevice= new Device({
        deviceid:generateUniqueNumber(1000000000, 9999999999),
        allotedto:null,
        roomid:null,
        state:{
            light:0,
            fan:0,
            misc:0
        }
    });
    await ndevice.save();
    res.status(200).json({message:"Success"});
}catch(err){
  console.log(err);
    res.status(500).json({message:"Server error"});
}
})
router.get("/users",async(req,res)=>{
    try{
    const users= await User.find({});
    res.status(200).json({users:users});
}catch(err){
    res.status(500).json({message:"Server error"});
}
});
router.get("/devices",async(req,res)=>{
    try{
    const devices= await Device.find({}).populate('allotedto');
    res.status(200).json({devices:devices});
}catch(err){
    res.status(500).json({message:"Server error"});
}
});
module.exports = router;
