// backend/config/db.js
const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://alburraq:alburraq123group@alburraqcluster.nu1qjnr.mongodb.net/?retryWrites=true&w=majority&appName=AlBurraqCluster";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
