require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios"); // Import axios module
const propertyRoutes = require("./routes/propertyRoutes"); // Import the routes

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Default route handler
app.get("/", (req, res) => {
  res.send("Server is Running"); // Example response
});

// Use the property routes
app.use("/api", propertyRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    // Start server after successful MongoDB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
