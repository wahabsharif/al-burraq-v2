const JobPost = require("../models/JobPost");

// Create a new job post
exports.createJobPost = async (req, res) => {
  try {
    const { department, position, description } = req.body;

    if (!department || !position || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const jobPost = new JobPost({ department, position, description });
    await jobPost.save();

    res.status(201).json({ message: "Job post created successfully", jobPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all job posts
exports.getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find();
    res.status(200).json(jobPosts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single job post by ID
exports.getJobPostById = async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);
    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.status(200).json(jobPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a job post
exports.updateJobPost = async (req, res) => {
  try {
    const { department, position, description } = req.body;

    const jobPost = await JobPost.findByIdAndUpdate(
      req.params.id,
      { department, position, description },
      { new: true, runValidators: true }
    );

    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.status(200).json({ message: "Job post updated successfully", jobPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a job post
exports.deleteJobPost = async (req, res) => {
  try {
    const jobPost = await JobPost.findByIdAndDelete(req.params.id);

    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.status(200).json({ message: "Job post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
