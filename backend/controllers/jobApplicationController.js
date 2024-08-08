// controllers/jobApplicationController.js

const JobApplication = require("../models/JobApplication");

// Create a new job application
exports.createJobApplication = async (req, res) => {
  try {
    const jobApplication = new JobApplication(req.body);
    await jobApplication.save();
    res.status(201).json(jobApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all job applications
exports.getAllJobApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.find();
    res.status(200).json(jobApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a job application by ID
exports.getJobApplicationById = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id);
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }
    res.status(200).json(jobApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a job application by ID
exports.updateJobApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }
    res.status(200).json(jobApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a job application by ID
exports.deleteJobApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndDelete(
      req.params.id
    );
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }
    res.status(200).json({ message: "Job application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
