const Property = require("../models/Property");
const slugify = require("slugify");
const axios = require("axios");

// Generate a unique slug for a property
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

// Get properties based on search filters
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

// Get properties with filters
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

// Get property by ID
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

// Get property by slug
exports.getPropertyBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const property = await Property.findOne({ slug });
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new property
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
    // Remove commas from price and area
    const cleanedPrice = parseFloat(price.replace(/,/g, ""));
    const cleanedArea = parseFloat(area.replace(/,/g, ""));

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
    }

    const slug = await generateUniqueSlug(title);

    const newProperty = new Property({
      title,
      description,
      price: cleanedPrice, // Save cleaned price
      location,
      image: imageUrl, // Save image URL
      purpose,
      propertyType,
      area: cleanedArea, // Save cleaned area
      slug,
    });

    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing property
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
    // Initialize cleanedPrice and cleanedArea
    let cleanedPrice = null;
    let cleanedArea = null;

    // Remove commas and convert to number if price is a string
    if (typeof price === "string") {
      cleanedPrice = parseFloat(price.replace(/,/g, ""));
    } else if (typeof price === "number") {
      cleanedPrice = price;
    }

    // Remove commas and convert to number if area is a string
    if (typeof area === "string") {
      cleanedArea = parseFloat(area.replace(/,/g, ""));
    } else if (typeof area === "number") {
      cleanedArea = area;
    }

    const slug = await generateUniqueSlug(title);

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price: cleanedPrice, // Save cleaned price
        location,
        image,
        purpose,
        propertyType,
        area: cleanedArea, // Save cleaned area
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

// Delete a property
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

// Get properties with filters and sort by createdAt
exports.getLatestProperties = async (req, res) => {
  try {
    // Fetch the 5 latest properties sorted by createdAt in descending order
    const properties = await Property.find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(5); // Limit to 5 properties

    res.json(properties);
  } catch (err) {
    console.error("Error fetching properties:", err.message);
    res.status(500).send("Server Error");
  }
};
