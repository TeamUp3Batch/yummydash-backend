const express = require('express');
const router = express.Router();
const {
  updateCart,
  removeItemOrRemoveCart,
  updateOrderStatus,
  getPendingOrdersByRestaurantId,
  getAllOrdersByUserId,
  getAllOrdersByRestaurantId,
  getOrderDetailsByOrderId ,
  updateDriverRatingByUser,
  updateRestauarantRatingByUser,
} = require('../controllers/cartController');
const {placeOrderByStripe} = require('../controllers/stripeOrderController');
const {getCartDetailsToCheckout} = require('../controllers/checkoutController');

const {deleteCart} = require('../controllers/cartController');


// Route for user registration
router.post('/checkout', getCartDetailsToCheckout);
router.post('/placeOrder', placeOrderByStripe);
router.post('/updateCart', updateCart );
router.post('/removeItemOrRemoveCart', removeItemOrRemoveCart );
router.post('/deleteCart',deleteCart);

router.post('/updateOrderStatus', updateOrderStatus);

router.post('/updateDriverRatingByUser', updateDriverRatingByUser);
router.post('/updateRestauarantRatingByUser', updateRestauarantRatingByUser);

router.get('/getPendingOrdersByRestaurantId', getPendingOrdersByRestaurantId);
router.get('/getAllOrdersByUserId', getAllOrdersByUserId);
router.get('/getAllOrdersByRestaurantId', getAllOrdersByRestaurantId);
router.get('/getOrderDetailsByOrderId',getOrderDetailsByOrderId);
module.exports = router;
