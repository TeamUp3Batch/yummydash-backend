const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantsByCuisine,
  getMenuItemsByRestaurant,
  getRestaurantDetailsById,
  getRestaurantMenuByCategory,

  // Added by Farhana
  getRestaurantsByRating,
  getRestaurantMenusByPrice,
  getRestaurantMenusBelowPrice,
  getMenusBelowDeliveryMinTime,
  getMenusBelowDeliveryMedTime,
  getMenusBelowDeliveryMaxTime,
  

} = require('../controllers/restaurantController');


// Route for user registration
router.get('/getAllRestaurants', getAllRestaurants);
router.get('/getRestaurantsByCuisine', getRestaurantsByCuisine);
router.get('/getMenuItemsByRestaurant', getMenuItemsByRestaurant);
router.get('/getRestaurantDetailsById', getRestaurantDetailsById);
router.get('/getRestaurantMenuByCategory', getRestaurantMenuByCategory);

// Added by Farhana
router.get('/getRestaurantsByRating', getRestaurantsByRating);
router.get('/getRestaurantMenusByPrice', getRestaurantMenusByPrice);
router.get('/getRestaurantMenusBelowPrice', getRestaurantMenusBelowPrice);
router.get('/getMenusBelowDeliveryMinTime', getMenusBelowDeliveryMinTime);
router.get('/getMenusBelowDeliveryMedTime', getMenusBelowDeliveryMedTime);
router.get('/getMenusBelowDeliveryMaxTime', getMenusBelowDeliveryMaxTime);
module.exports = router;
