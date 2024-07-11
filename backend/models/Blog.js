const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
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
    shortDescription: {
      type: String,
      required: true,
    },
    bodyContent: {
      type: String,
      required: true,
    },
    headings: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
