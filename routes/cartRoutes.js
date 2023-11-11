const express = require('express');
const router = express.Router();
const {addToCart,
  removeFromCart,
  updateCart,
  removeItemOrRemoveCart,
  updateOrderStatus,
  getPendingOrdersByRestaurantId,
  getAllOrdersByUserId,
  getAllOrdersByRestaurantId,
} = require('../controllers/cartController');
const {placeOrderByStripe} = require('../controllers/stripeOrderController');
const {getCartDetailsToCheckout} = require('../controllers/checkoutController');

const {deleteCart} = require('../controllers/cartController');


// Route for user registration
router.post('/addToCart', addToCart);
router.post('/removeFromCart', removeFromCart);
router.post('/checkout', getCartDetailsToCheckout);
router.post('/placeOrder', placeOrderByStripe);
router.post('/updateCart', updateCart );
router.post('/removeItemOrRemoveCart', removeItemOrRemoveCart );
router.post('/deleteCart',deleteCart);

router.post('/updateOrderStatus', updateOrderStatus);

router.get('/getPendingOrdersByRestaurantId', getPendingOrdersByRestaurantId);
router.get('/getAllOrdersByUserId', getAllOrdersByUserId);
router.get('/getAllOrdersByRestaurantId', getAllOrdersByRestaurantId);
module.exports = router;
