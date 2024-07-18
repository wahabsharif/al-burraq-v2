const Property = require("../models/Property");
const slugify = require("slugify");
const axios = require("axios");

const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true });
  let existingProperty = await Property.findOne({ slug });
  let count = 1;

  while (existingProperty) {
    slug = `${slugify(title, { lower: true })}-${count}`;
    existingProperty = await Property.findOne({ slug });
    count++;
  }

  return slug;
};

exports.searchProperties = async (req, res) => {
  const { purpose, propertyType, location, minPrice, maxPrice } = req.query;

  // Convert minPrice and maxPrice to numbers
  const parsedMinPrice = parseInt(minPrice, 10);
  const parsedMaxPrice = parseInt(maxPrice, 10);

  // Build the query object
  const query = {
    purpose,
    propertyType,
    location: { $regex: location, $options: "i" }, // Case insensitive search
  };

  // Add price range filters if valid numbers
  if (!isNaN(parsedMinPrice)) {
    query.price = { $gte: parsedMinPrice };
  }
  if (!isNaN(parsedMaxPrice)) {
    query.price = { ...query.price, $lte: parsedMaxPrice };
  }

  try {
    const properties = await Property.find(query);
    res.json(properties);
  } catch (err) {
    console.error("Error fetching properties:", err.message);
    res.status(500).send("Server Error");
  }
};

exports.getProperties = async (req, res) => {
  const { purpose, propertyType, location, minPrice, maxPrice } = req.query;

  const filter = {};

  if (purpose) filter.purpose = purpose;
  if (propertyType) filter.propertyType = propertyType;
  if (location) filter.location = location;
  if (minPrice) filter.price = { $gte: minPrice };
  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };

  try {
    const properties = await Property.find(filter);
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

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
      // Upload the image to ImgBB or Cloudinary and get the URL
      const uploadData = new FormData();
      uploadData.append("image", image);

      const imgBBResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=a53c2a4a94f3dd313d50711ac901dc17`,
        uploadData
      );

      imageUrl = imgBBResponse.data.data.url;

      // Uncomment below lines to use Cloudinary instead of ImgBB
      /*
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_NAME/image/upload`,
        uploadData
      );

      imageUrl = cloudinaryResponse.data.secure_url;
      */
    }

    const slug = await generateUniqueSlug(title);

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      image: imageUrl, // Save image URL
      purpose,
      propertyType,
      area,
      slug,
    });

    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProperty = async (req, res) => {
  const { id } = req.params;
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
    const slug = await generateUniqueSlug(title);

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        location,
        image,
        purpose,
        propertyType,
        area,
        slug,
      },
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
};

exports.deleteProperty = async (req, res) => {
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
};
