// server.js
require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const propertyRoutes = require("./routes/propertyRoutes"); // Import the routes
const connectDB = require("./config/db"); // Import MongoDB connection

const app = express();
const PORT = process.env.PORT || 5000;

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
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
