const express = require("express");
const router = express.Router();
const propertyXmlController = require("../controllers/propertyXmlController");

// Create a new PropertyXml
router.post("/propertyxml", propertyXmlController.createPropertyXml);

// Get all PropertyXmls
router.get("/propertyxml", propertyXmlController.getAllPropertyXmls);

// Get a single PropertyXml by ID
router.get("/propertyxml/:id", propertyXmlController.getPropertyXmlById);

// Get a single PropertyXml by ID as XML
router.get(
  "/propertyxml/:id/xml",
  propertyXmlController.getPropertyXmlAsXmlById
);

// Update a PropertyXml by ID
router.put("/propertyxml/:id", propertyXmlController.updatePropertyXmlById);

// Delete a PropertyXml by ID
router.delete("/propertyxml/:id", propertyXmlController.deletePropertyXmlById);

module.exports = router;
