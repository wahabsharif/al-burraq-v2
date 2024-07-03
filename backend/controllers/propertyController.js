// propertyController.js

const Property = require("../models/Property");
const axios = require("axios");

exports.createProperty = async (req, res) => {
  const { title, description, price, location, image } = req.body;

  try {
    let imageUrl = ""; // Initialize image URL variable

    if (image) {
      // Assuming image is a URL received from ImgBB or Cloudinary
      imageUrl = image;
    }

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      image: imageUrl, // Save image URL
    });

    await newProperty.save();

    res.json(newProperty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
