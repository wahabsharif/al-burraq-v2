const mongoose = require("mongoose");

const paragraphSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["paragraph", "heading", "bold", "italic", "underline"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

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
    images: {
      type: [String],
      required: true,
    },
    bodyContent: {
      type: [paragraphSchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
