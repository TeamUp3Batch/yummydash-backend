const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantsByCuisine,
  getMenuItemsByRestaurant,
  getRestaurantDetailsById
} = require('../controllers/restaurantController');
const protect = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();

// Route for user registration
router.get('/getAllRestaurants', getAllRestaurants);
router.post('/getRestaurantsByCuisine', getRestaurantsByCuisine);
router.post('/getMenuItemsByRestaurant', getMenuItemsByRestaurant);
router.post('/getRestaurantDetailsById', getRestaurantDetailsById);

module.exports = router;
