const express = require("express");
const router = express.Router();
const { getAllRestaurants, getRestaurantsByCuisine,insertNewRestaurant } = require("../controllers/restaurantController");
const protect = require("../middleware/authMiddleware");
const multer = require('multer');
const upload = multer();

// Route for user registration
router.get("/getAllRestaurants", getAllRestaurants);
router.post("/getRestaurantsByCuisine",getRestaurantsByCuisine);
router.post("/insertNewRestaurant",insertNewRestaurant);

module.exports = router;
