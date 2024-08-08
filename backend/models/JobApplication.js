// models/JobApplication.js

const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
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
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    currentJobStatus: {
      type: String,
      required: true,
    },
    communicationSkills: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    salesSkills: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    negotiationSkills: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    realEstateLicense: {
      type: Boolean,
      required: true,
    },
    willingToWorkWeekends: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
