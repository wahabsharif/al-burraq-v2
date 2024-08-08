// routes/jobApplicationRoutes.js

const express = require("express");
const router = express.Router();
const jobApplicationController = require("../controllers/jobApplicationController");

// Create a new job application
router.post("/job-applications", jobApplicationController.createJobApplication);

// Get all job applications
router.get("/job-applications", jobApplicationController.getAllJobApplications);

// Get a job application by ID
router.get(
  "/job-applications/:id",
  jobApplicationController.getJobApplicationById
);

// Update a job application by ID
router.put(
  "/job-applications/:id",
  jobApplicationController.updateJobApplication
);

// Delete a job application by ID
router.delete(
  "/job-applications/:id",
  jobApplicationController.deleteJobApplication
);

module.exports = router;
