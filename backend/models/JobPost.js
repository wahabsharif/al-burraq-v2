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

const jobPostSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
      enum: [
        "Sales and Marketing",
        "Administration",
        "Account and Finance",
        "Property Management",
        "Maintenance",
      ],
    },
    position: {
      type: String,
      required: true,
    },
    description: {
      type: [paragraphSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobPost", jobPostSchema);
