const express = require("express");
const router = express.Router();
const {
  getProperties,
  searchProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

// GET all properties
router.get("/properties", getProperties);

// GET properties with search criteria
router.get("/properties/search", searchProperties);

// GET single property
router.get("/properties/:id", getPropertyById);

// POST create a property
router.post("/properties", createProperty);

// PUT update a property
router.put("/properties/:id", updateProperty);

// DELETE delete a property
router.delete("/properties/:id", deleteProperty);

module.exports = router;
