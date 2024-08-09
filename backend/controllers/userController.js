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
      fullName, // Set fullName based on the request body
      designation, // Set designation based on the request body
      isAdmin, // Set isAdmin based on the request body
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
    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Password is correct, generate JWT token
    const token = user.generateAuthToken();

    res.json({ token });
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
  const updates = req.body;

  try {
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
      fullName: req.user.fullName, // Added fullName to the response
      designation: req.user.designation, // Added designation to the response
    });
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
