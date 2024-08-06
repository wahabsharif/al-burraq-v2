// backend/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const careerRoutes = require("./routes/careerRoutes");
const jobPostRoutes = require("./routes/jobPostRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", propertyRoutes);
app.use("/api", blogRoutes);
app.use("/api", commentRoutes);
app.use("/api", careerRoutes);
app.use("/api", jobPostRoutes);

// Default route handler
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// Connect to MongoDB
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
