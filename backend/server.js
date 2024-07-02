// backend/server.js
require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Property = require("./models/Property"); // Adjust path as needed

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routes definition...

// Fetch all properties
app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new property
app.post("/api/properties", async (req, res) => {
  const { title, description, price, location } = req.body;

  try {
    const newProperty = new Property({ title, description, price, location });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an existing property
app.put("/api/properties/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location } = req.body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { title, description, price, location },
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a property
app.delete("/api/properties/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Remove useFindAndModify: false, as it is deprecated
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
