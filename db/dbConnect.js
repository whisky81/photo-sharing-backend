const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  mongoose
    .connect("mongodb+srv://whisky81:sr8r9PZvYiTAhSbr@whisky.1fr22.mongodb.net/photo_sharing?retryWrites=true&w=majority&appName=whisky")
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;
