const express = require("express");
const router = express.Router();
const { getAllCuisines } = require("../controllers/cuisineController");
const protect = require("../middleware/authMiddleware");

// Route for user registration
router.get("/getAllCuisines", getAllCuisines);

module.exports = router;
