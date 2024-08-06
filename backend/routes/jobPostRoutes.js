const express = require("express");
const {
  createJobPost,
  getAllJobPosts,
  getJobPostById,
  updateJobPost,
  deleteJobPost,
} = require("../controllers/jobPostController");
const router = express.Router();

// Route to create a new job post
router.post("/job-posts", createJobPost);

// Route to get all job posts
router.get("/job-posts", getAllJobPosts);

// Route to get a single job post by ID
router.get("/job-posts/:id", getJobPostById);

// Route to update a job post
router.put("/job-posts/:id", updateJobPost);

// Route to delete a job post
router.delete("/job-posts/:id", deleteJobPost);

module.exports = router;
