// routes/commentRoutes.js

const express = require("express");
const {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

// Create a new comment
router.post("/comments", createComment);
// Get all comments
router.get("/comments", getAllComments);
// Update a comment
router.put("/comments/:id", updateComment);
// Delete a comment
router.delete("/comments/:id", deleteComment);

module.exports = router;
