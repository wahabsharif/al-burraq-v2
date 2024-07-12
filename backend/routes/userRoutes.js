// backend/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

// Register route
router.post("/user/register", registerUser);
// Login route
router.post("/user/login", loginUser);
// CRUD routes (only accessible to admins)
router.get("/user", auth, getUsers);
router.put("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);

module.exports = router;
