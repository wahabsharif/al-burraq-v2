// routes/careerRoutes.js

const express = require("express");
const router = express.Router();
const careerController = require("../controllers/careerController");

router.get("/careers/", careerController.getAllCareers);
router.get("/careers/:id", careerController.getCareerById);
router.post("/careers/", careerController.createCareer);
router.put("/careers/:id", careerController.updateCareer);
router.delete("/careers/:id", careerController.deleteCareer);

module.exports = router;
