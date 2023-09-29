const express = require("express");
const router = express.Router();
const { getAllRestaurants,get, getRestaurantsByCuisine } = require("../controllers/restaurantController");
const protect = require("../middleware/authMiddleware");

// Route for user registration
router.get("/getAllRestaurants", getAllRestaurants);
router.post("/getRestaurantsByCuisine",getRestaurantsByCuisine);

module.exports = router;
