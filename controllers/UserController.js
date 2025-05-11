const mongoose = require("mongoose");
const User = require("../db/userModel");
const Photo = require("../db/photoModel");

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: `Invalid user ID: ${id}`,
      });
    }

    const user = await User.findById(id).select({
      _id: true,
      first_name: true,
      last_name: true,
      location: true,
      description: true,
      occupation: true,
    });

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
    const users = await User.find({}).select({
      _id: true,
      first_name: true,
      last_name: true,
    });

     let photos = await Photo.find({}, 'user_id comments.user');
     photos = JSON.parse(JSON.stringify(photos)); 
     console.log(photos);
     const photoStats = {};
     const commentStats = {};  
     for (const photo of photos) {
        if (!photoStats[photo.user_id]) {
          photoStats[photo.user_id] = 1;
        } else {
          photoStats[photo.user_id]++;
        }

        console.log(photo.comments);
        for (const tmp of photo.comments) {
          if (!commentStats[tmp.user]) {
            commentStats[tmp.user] = 1;
          } else {
            commentStats[tmp.user]++;
          }
        }
     }

     

    return res.status(200).json({
      users,
      message: "users fetched successfully",
      photoStats,
      commentStats,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function photosOfUser(req, res) {
  try {
    const user = req.user;

    const photos = await Photo.find({ user_id: user._id })
      .select("-__v")
      .populate({
        path: "comments.user",
        select: {
          _id: true,
          first_name: true,
          last_name: true,
        },
      });

    return res.status(200).json({
      photos,
      message: "Photos fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
} 


async function commentsOfUser(req, res) {
  try {
    const user = req.user; 

    const comments = await Photo.find({ "comments.user": user._id }, 'comments.comment file_name comments.user');   


    return res.status(200).json({
      comments,
      message: "Comments fetched successfully",
    });


  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}


module.exports = {
  commentsOfUser,
  getUserById,
  getAllUsers,
  photosOfUser,
};