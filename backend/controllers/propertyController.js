// backend/controllers/propertyController.js
const Property = require("../models/Property");

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Property not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Public
exports.createProperty = async (req, res) => {
  const { title, description, price, location } = req.body;

  try {
    const newProperty = new Property({
      title,
      description,
      price,
      location,
    });

    await newProperty.save();

    res.json(newProperty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Public
exports.updateProperty = async (req, res) => {
  const { title, description, price, location } = req.body;

  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    property.title = title;
    property.description = description;
    property.price = price;
    property.location = location;

    await property.save();

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Public
exports.deleteProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    await Property.findByIdAndRemove(req.params.id);

    res.json({ msg: "Property removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
