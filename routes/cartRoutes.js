const express = require('express');
const router = express.Router();
const {addToCart} = require('../controllers/cartController');

// Route for user registration
router.post('/addToCart', addToCart);

module.exports = router;
