const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register user
exports.registerUser = async (req, res) => {
  const { username, password, email, fullName, designation, isAdmin } =
    req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({
      username,
      password,
      email,
      fullName,
      designation,
      isAdmin,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update last login time and set isActive to true
    user.lastLogin = new Date();
    user.isActive = true;
    await user.save(); // Save the user with updated fields

    const token = user.generateAuthToken();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the token

    // Update the user's `isActive` field to false
    await User.findByIdAndUpdate(userId, { isActive: false });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, fullName, designation, password } = req.body;

  try {
    const updates = {};

    if (email) {
      // Validate email format if needed
      updates.email = email;
    }

    if (fullName) {
      updates.fullName = fullName;
    }

    if (designation) {
      updates.designation = designation;
    }

    if (password) {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 12);
      updates.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get current user details
exports.getCurrentUser = async (req, res) => {
  try {
    res.json({
      username: req.user.username,
      fullName: req.user.fullName,
      designation: req.user.designation,
      email: req.user.email, // Ensure email is included
      isActive: req.user.isActive,
      lastLogin: req.user.lastLogin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update current user
exports.updateCurrentUser = async (req, res) => {
  const userId = req.user._id; // Get the current user's ID from the token
  const { password, ...updates } = req.body; // Separate password from other updates

  try {
    if (password) {
      // Hash the password before updating
      updates.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check if username exists
exports.checkUsernameAvailability = async (req, res) => {
  const { username } = req.params;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
