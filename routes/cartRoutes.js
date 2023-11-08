const express = require('express');
const router = express.Router();
const {addToCart,
  removeFromCart,
  updateCart,
  removeItemOrRemoveCart,
} = require('../controllers/cartController');
const {placeOrderByStripe} = require('../controllers/stripeOrderController');
const {getCartDetailsToCheckout} = require('../controllers/checkoutController');

// Route for user registration
router.post('/addToCart', addToCart);
router.post('/removeFromCart', removeFromCart);
router.post('/checkout', getCartDetailsToCheckout);
router.post('/placeOrder', placeOrderByStripe);
router.post('/updateCart', updateCart );
router.post('/removeItemOrRemoveCart', removeItemOrRemoveCart );


module.exports = router;
