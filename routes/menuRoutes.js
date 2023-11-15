const express = require('express');
const router = express.Router();

const {
addMenuItemToRestaurant,
updateMenuItemToRestaurant,
deleteMenuItem
    
  
  } = require('../controllers/menuController');
router.post('/addMenuItemToRestaurant',addMenuItemToRestaurant);
router.post('/updateMenuItemToRestaurant',updateMenuItemToRestaurant);
router.post('/deleteMenuItem',deleteMenuItem);
module.exports = router;
