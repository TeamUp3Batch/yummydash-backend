const express = require('express');
const router = express.Router();
const {addToCart,removeFromCart} = require('../controllers/cartController');

// Route for user registration
router.post('/addToCart', addToCart);
router.post('/removeFromCart',removeFromCart);

module.exports = router;
