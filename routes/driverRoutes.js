const express = require('express');
const router = express.Router();

const {

  authDriver,
  registerDriver, 
  logoutDriver,
  getOrdersPickedByDriver,
  getOrdersCompletedByDriver,
  getDriverProfile,
  getReadyOrders,
  updateDriverRating,
  getAllDrivers,
  updateDriverDetails,
  updateOrdersDeliveredByDriver

} = require('../controllers/driverController');
const protect = require('../middleware/authMiddleware');

router.post('/login', authDriver);
router.post('/registerDriver', registerDriver);
router.post('/logout', logoutDriver);
router.post('/updateDriverRating',updateDriverRating);
router.get('/getOrdersPickedByDriver',getOrdersPickedByDriver);
router.get('/getOrdersCompletedByDriver',getOrdersCompletedByDriver)
router.get('/getDriverProfile',getDriverProfile)
router.get('/getReadyOrders',getReadyOrders);
router.get('/getAllDrivers',getAllDrivers);
router.post('/updateDriverDetails',updateDriverDetails);
router.post('/updateDeliveredOrdersByDriver',updateOrdersDeliveredByDriver);
module.exports = router;

