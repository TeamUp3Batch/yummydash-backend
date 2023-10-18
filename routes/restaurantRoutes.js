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
router.post('/getRestaurantsByCuisine', getRestaurantsByCuisine);
router.post('/getMenuItemsByRestaurant', getMenuItemsByRestaurant);
router.post('/getRestaurantDetailsById', getRestaurantDetailsById);
router.post('/getRestaurantMenuByCategory', getRestaurantMenuByCategory);

module.exports = router;
