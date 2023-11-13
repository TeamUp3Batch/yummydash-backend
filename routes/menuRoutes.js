const express = require('express');
const router = express.Router();

const {
addMenuItemToRestaurant,
UpdateMenuItemToRestaurant,
deleteMenuItem
    
  
  } = require('../controllers/menuController');
router.post('/addMenuItemToRestaurant',addMenuItemToRestaurant);
router.post('/UpdateMenuItemToRestaurant',UpdateMenuItemToRestaurant);
router.post('/deleteMenuItem',deleteMenuItem);
module.exports = router;
