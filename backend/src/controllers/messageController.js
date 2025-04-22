const User = require("../models/userModel");
const Message = require("../models/messageModel");
const cloudinary = require("../config/cloudinary");
const mongoose = require('mongoose');
const { getReceiverSocketId, io } = require("../config/socket");

module.exports.getUserSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    

    const message = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage=new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl,
    });

    await newMessage.save()

    //realtime socket.io

    const receiverSocketId=getReceiverSocketId(receiverId)
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error) {

    console.log("Error in sendMessage controller:",error.message);
    res.status(500).json({ error: "Internal Server Error" });

  }
};
