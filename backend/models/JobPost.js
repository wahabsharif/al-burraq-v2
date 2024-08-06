const mongoose = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JobPost;
