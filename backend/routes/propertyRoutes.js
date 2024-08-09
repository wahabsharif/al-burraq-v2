const express = require("express");
const router = express.Router();
const {
  getProperties,
  searchProperties,
  getPropertyById,
  getPropertyBySlug,
  createProperty,
  updateProperty,
  deleteProperty,
  getLatestProperties, // Import the function for fetching the latest properties
} = require("../controllers/propertyController");

// GET all properties
router.get("/properties", getProperties);

// GET properties with search criteria
router.get("/properties/search", searchProperties);

// GET the 5 latest properties
router.get("/properties/latest", getLatestProperties); // New route for latest properties

// GET single property
router.get("/properties/:id", getPropertyById);

// GET property by slug
router.get("/properties/slug/:slug", getPropertyBySlug);

// POST create a property
router.post("/properties", createProperty);

// PUT update a property
router.put("/properties/:id", updateProperty);

// DELETE delete a property
router.delete("/properties/:id", deleteProperty);

module.exports = router;
