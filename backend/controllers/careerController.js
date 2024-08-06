// controllers/careerController.js

const Career = require("../models/Career");

// Get all career applications
exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find();
    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single career application
exports.getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: "Career application not found" });
    }
    res.status(200).json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new career application
exports.createCareer = async (req, res) => {
  const career = new Career(req.body);
  try {
    const newCareer = await career.save();
    res.status(201).json(newCareer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing career application
exports.updateCareer = async (req, res) => {
  try {
    const updatedCareer = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCareer) {
      return res.status(404).json({ message: "Career application not found" });
    }
    res.status(200).json(updatedCareer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a career application
exports.deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) {
      return res.status(404).json({ message: "Career application not found" });
    }
    res.status(200).json({ message: "Career application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
