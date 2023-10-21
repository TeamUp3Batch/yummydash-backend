const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantsByCuisine,
  getMenuItemsByRestaurant,
  getRestaurantDetailsById,
  getRestaurantMenuByCategory,
} = require('../controllers/restaurantController');


// Route for user registration
router.get('/getAllRestaurants', getAllRestaurants);
router.get('/getRestaurantsByCuisine', getRestaurantsByCuisine);
router.get('/getMenuItemsByRestaurant', getMenuItemsByRestaurant);
router.get('/getRestaurantDetailsById', getRestaurantDetailsById);
router.get('/getRestaurantMenuByCategory', getRestaurantMenuByCategory);

module.exports = router;
