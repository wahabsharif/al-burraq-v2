// controllers/commentController.js

const Comment = require("../models/Comment");

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { name, email, phoneNumber, comment } = req.body;
    const newComment = new Comment({ name, email, phoneNumber, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, comment } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { name, email, phoneNumber, comment },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
