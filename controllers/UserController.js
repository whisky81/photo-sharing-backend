const mongoose = require("mongoose");
const User = require("../db/userModel");
const Photo = require("../db/photoModel");

async function getUserById(req, res, next) {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: `Invalid user ID: ${userId}`,
      });
    }

    const user = await User.findById(userId).select("-__v");

    if (!user) {
      return res.status(404).json({
        message: `User with ID ${id} not found`,
      });
    }
    req.user = user; 
    return next();  
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select("-__v");

    let photos = await Photo.find({}, "user_id comments.user");
    photos = JSON.parse(JSON.stringify(photos));
    console.log(photos[0].comments);
    const photoStats = {};
    const commentStats = {};
    for (const photo of photos) {
      if (!photoStats[photo.user_id]) {
        photoStats[photo.user_id] = 1;
      } else {
        photoStats[photo.user_id]++;
      }

      for (const comment of photo.comments) {
        if (!commentStats[comment.user]) {
          commentStats[comment.user] = 1;
        } else {
          commentStats[comment.user]++;
        }
      }
    }

    return res.status(200).json({
      users,
      photoStats,
      commentStats,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getUserById,
  getAllUsers,
};
