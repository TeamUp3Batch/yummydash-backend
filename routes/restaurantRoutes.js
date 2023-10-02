const express = require("express");
const router = express.Router();
const { getAllRestaurants, getRestaurantsByCuisine,uploadRestaurantImage,insertNewRestaurant } = require("../controllers/restaurantController");
const {insertNewTestRestaurant} = require('./../controllers/testingRestaurantController');
const protect = require("../middleware/authMiddleware");
const multer = require('multer');
const upload = multer();

// Route for user registration
router.get("/getAllRestaurants", getAllRestaurants);
router.post("/getRestaurantsByCuisine",getRestaurantsByCuisine);
// router.post("/uploadRestaurantImage",upload.single('rest-image'),uploadRestaurantImage);
router.post("/insertNewRestaurant",insertNewRestaurant);
router.post("/insertNewTestRestaurant",insertNewTestRestaurant);

module.exports = router;
