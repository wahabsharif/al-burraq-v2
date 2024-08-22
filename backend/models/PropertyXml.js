const mongoose = require("mongoose");
const slugify = require("slugify");

const PropertyXmlSchema = new mongoose.Schema({
  Property_Ref_No: { type: String, required: true, unique: true },
  Permit_Number: { type: String, required: true },
  Property_Status: { type: String, enum: ["live", "deleted"], required: true },
  Property_purpose: { type: String, enum: ["Buy", "Rent"], required: true },
  Property_Type: {
    type: String,
    enum: [
      "Villa",
      "Apartment",
      "Office",
      "Shop",
      "Warehouse",
      "Factory",
      "Labour Camp",
      "Other Commercial",
      "Commercial Building",
      "Residential Floor",
      "Commercial Floor",
      "Residential Land",
      "Commercial Land",
      "Townhouse",
      "Residential Building",
      "Hotel Apartment",
      "Loft Apartment",
      "Duplex",
      "Pent House",
    ],
    required: true,
  },
  Property_Size: { type: Number, required: true },
  Property_Size_Unit: { type: String, enum: ["SQFT"], default: "SQFT" },
  Bedrooms: { type: Number, required: true },
  Bathrooms: { type: Number, required: true },
  Features: [{ type: String }],
  Off_plan: { type: String, enum: ["Yes", "No"], required: true },
  Portals: [{ type: String, enum: ["Bayut", "dubizzle"] }],
  Last_Updated: { type: Date, default: Date.now },
  Property_Title: { type: String, required: true },
  Property_Description: { type: String, required: true },
  Property_Title_AR: { type: String },
  Property_Description_AR: { type: String },
  Price: { type: Number, required: true },
  Rent_Frequency: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly", "Yearly"],
  },
  Furnished: { type: String, enum: ["Yes", "No", "Partly"], required: true },
  Images: [{ type: String }],
  Videos: [{ type: String }],
  City: { type: String, required: true },
  Locality: { type: String, required: true },
  Sub_Locality: { type: String },
  Tower_Name: { type: String },
  Listing_Agent: { type: String, required: true },
  Listing_Agent_Phone: { type: String, required: true },
  Listing_Agent_Email: { type: String, required: true },
  slug: { type: String, unique: true },
});

// Middleware to generate slug before saving
PropertyXmlSchema.pre("save", function (next) {
  if (this.isModified("Property_Title") || !this.slug) {
    this.slug = slugify(this.Property_Title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("PropertyXml", PropertyXmlSchema);
