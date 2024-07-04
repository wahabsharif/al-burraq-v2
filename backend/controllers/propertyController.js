const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  const {
    title,
    description,
    price,
    location,
    image,
    purpose,
    propertyType,
    area,
  } = req.body;

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
      purpose,
      propertyType,
      area,
    });

    await newProperty.save();

    res.json(newProperty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
