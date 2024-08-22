const PropertyXml = require("../models/PropertyXml");
const slugify = require("slugify");

// Create a new PropertyXml
exports.createPropertyXml = async (req, res) => {
  try {
    const propertyXml = new PropertyXml(req.body);
    propertyXml.slug = slugify(propertyXml.Property_Title, {
      lower: true,
      strict: true,
    });
    await propertyXml.save();
    res.status(201).json(propertyXml);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all PropertyXmls
exports.getAllPropertyXmls = async (req, res) => {
  try {
    const propertyXmls = await PropertyXml.find();
    res.status(200).json(propertyXmls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single PropertyXml by ID
exports.getPropertyXmlById = async (req, res) => {
  try {
    const propertyXml = await PropertyXml.findById(req.params.id);
    if (!propertyXml) {
      return res.status(404).json({ error: "PropertyXml not found" });
    }
    res.status(200).json(propertyXml);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single PropertyXml by slug
exports.getPropertyXmlBySlug = async (req, res) => {
  try {
    const propertyXml = await PropertyXml.findOne({ slug: req.params.slug });
    if (!propertyXml) {
      return res.status(404).json({ error: "PropertyXml not found" });
    }
    res.status(200).json(propertyXml);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single PropertyXml by ID and return as XML
exports.getPropertyXmlAsXmlById = async (req, res) => {
  try {
    const propertyXml = await PropertyXml.findById(req.params.id);
    if (!propertyXml) {
      return res.status(404).json({ error: "PropertyXml not found" });
    }

    const xml = xmlbuilder
      .create("PropertyXml")
      .ele("Property_Ref_No", propertyXml.Property_Ref_No)
      .up()
      .ele("Permit_Number", propertyXml.Permit_Number)
      .up()
      .ele("Property_Status", propertyXml.Property_Status)
      .up()
      .ele("Property_purpose", propertyXml.Property_purpose)
      .up()
      .ele("Property_Type", propertyXml.Property_Type)
      .up()
      .ele("Property_Size", propertyXml.Property_Size)
      .up()
      .ele("Property_Size_Unit", propertyXml.Property_Size_Unit)
      .up()
      .ele("Bedrooms", propertyXml.Bedrooms)
      .up()
      .ele("Bathrooms", propertyXml.Bathrooms)
      .up()
      .ele("Features")
      .ele("Feature", propertyXml.Features)
      .up()
      .up()
      .ele("Off_plan", propertyXml.Off_plan)
      .up()
      .ele("Portals")
      .ele("Portal", propertyXml.Portals)
      .up()
      .up()
      .ele("Last_Updated", propertyXml.Last_Updated)
      .up()
      .ele("Property_Title", propertyXml.Property_Title)
      .up()
      .ele("Property_Description", propertyXml.Property_Description)
      .up()
      .ele("Property_Title_AR", propertyXml.Property_Title_AR)
      .up()
      .ele("Property_Description_AR", propertyXml.Property_Description_AR)
      .up()
      .ele("Price", propertyXml.Price)
      .up()
      .ele("Rent_Frequency", propertyXml.Rent_Frequency)
      .up()
      .ele("Furnished", propertyXml.Furnished)
      .up()
      .ele("Images")
      .ele("Image", propertyXml.Images)
      .up()
      .up()
      .ele("Videos")
      .ele("Video", propertyXml.Videos)
      .up()
      .up()
      .ele("City", propertyXml.City)
      .up()
      .ele("Locality", propertyXml.Locality)
      .up()
      .ele("Sub_Locality", propertyXml.Sub_Locality)
      .up()
      .ele("Tower_Name", propertyXml.Tower_Name)
      .up()
      .ele("Listing_Agent", propertyXml.Listing_Agent)
      .up()
      .ele("Listing_Agent_Phone", propertyXml.Listing_Agent_Phone)
      .up()
      .ele("Listing_Agent_Email", propertyXml.Listing_Agent_Email)
      .end({ pretty: true });

    res.set("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a PropertyXml by ID
exports.updatePropertyXmlById = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.Property_Title) {
      updates.slug = slugify(updates.Property_Title, {
        lower: true,
        strict: true,
      });
    }
    const propertyXml = await PropertyXml.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!propertyXml) {
      return res.status(404).json({ error: "PropertyXml not found" });
    }
    res.status(200).json(propertyXml);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a PropertyXml by ID
exports.deletePropertyXmlById = async (req, res) => {
  try {
    const propertyXml = await PropertyXml.findByIdAndDelete(req.params.id);
    if (!propertyXml) {
      return res.status(404).json({ error: "PropertyXml not found" });
    }
    res.status(200).json({ message: "PropertyXml deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
