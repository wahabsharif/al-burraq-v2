const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    purpose: {
      type: String,
      required: true,
      enum: ["rent", "buy", "sale"],
    },
    propertyType: {
      type: String,
      required: true,
      enum: [
        "Offices",
        "apartments",
        "lands",
        "penthouses",
        "shops",
        "houses",
        "townhouses",
        "villas",
      ],
    },
    area: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
