const express = require('express')
const router = express.Router()
const { getTopPerformingDriver, getTopPerformingRestaurant,
    getTotalDrivers,
    getTotalRestaurants,
    getTotalUsers,
    getTotalOrdersDelivered,
    getSalesPerWeek,
    getSalesPerMonth } = require('../controllers/dashboardController');


router.get('/getTopPerformingDriver', getTopPerformingDriver)
router.get('/getTopPerformingRestaurant',getTopPerformingRestaurant)
router.get('/getTotalDrivers',getTotalDrivers)
router.get('/getTotalRestaurants',getTotalRestaurants)
router.get('/getTotalUsers',getTotalUsers)
router.get('/getTotalOrdersDelivered',getTotalOrdersDelivered)
router.get('/getSalesPerWeek',getSalesPerWeek)
router.get('/getSalesPerMonth',getSalesPerMonth)
module.exports = router;