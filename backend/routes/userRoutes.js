const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
  updateUser,
  deleteUser,
  checkUsernameAvailability,
} = require("../controllers/userController");
const { auth, adminAuth } = require("../middleware/auth");

// Register route
router.post("/user/register", registerUser);
// Login route
router.post("/user/login", loginUser);
// Get current user route
router.get("/user/me", auth, getCurrentUser);
// Check username availability
router.get("/user/:username", checkUsernameAvailability); // New route for checking username availability
// CRUD routes (only accessible to admins)
router.get("/user", adminAuth, getUsers);
router.put("/user/:id", adminAuth, updateUser);
router.delete("/user/:id", adminAuth, deleteUser);

module.exports = router;
