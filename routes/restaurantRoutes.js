const express = require("express");
const router = express.Router();
const { getAllRestaurants } = require("../controllers/restaurantController");
const protect = require("../middleware/authMiddleware");

// Route for user registration
router.get("/getAllRestaurants", getAllRestaurants);

module.exports = router;
