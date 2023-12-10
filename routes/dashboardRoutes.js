/**
 * @swagger
 * /getTopPerformingRestaurant:
 *   get:
 *     tags:
 *       - Performance
 *     summary: Get top performing restaurant
 *     description: Retrieves the restaurant with the highest number of delivered orders
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Restaurant with the highest number of delivered orders retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             topRestaurant:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   restaurantId:
 *                     type: string
 *                     description: ID of the top performing restaurant
 *                   restaurantName:
 *                     type: string
 *                     description: Name of the top performing restaurant
 *                   totalOrders:
 *                     type: integer
 *                     description: Total number of orders delivered by the restaurant
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /getTopPerformingDriver:
 *   get:
 *     tags:
 *       - Performance
 *     summary: Get top performing driver
 *     description: Retrieves the driver with the highest number of delivered orders
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Driver with the highest number of delivered orders retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *                 description: ID of the top performing driver
 *               ordersDelivered:
 *                 type: integer
 *                 description: Total number of orders delivered by the driver
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /getTotalDrivers:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get total number of drivers
 *     description: Retrieves the total count of registered drivers
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Total number of drivers retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             totalDrivers:
 *               type: integer
 *               description: Total count of drivers
 *       '404':
 *         description: No drivers found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /getTotalRestaurants:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get total number of restaurants
 *     description: Retrieves the total count of registered restaurants
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Total number of restaurants retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             totalRestaurants:
 *               type: integer
 *               description: Total count of restaurants
 *       '404':
 *         description: No restaurants found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /getTotalUsers:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get total number of users
 *     description: Retrieves the total count of registered users
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Total number of users retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             totalUsers:
 *               type: integer
 *               description: Total count of users
 *       '404':
 *         description: No users found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /getTotalOrdersDelivered:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get total number of delivered orders
 *     description: Retrieves the total count of orders that have been delivered
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Total number of delivered orders retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             OrdersDelivered:
 *               type: integer
 *               description: Total count of delivered orders
 *       '404':
 *         description: No delivered orders found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
/**
 * @swagger
 * /api/dashboard/getSalesPerWeek:
 *   get:
 *     tags:
 *       - Sales
 *     summary: Get sales per week
 *     description: Retrieves the total sales per week based on delivered orders
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Sales per week retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             weeklySales:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     description: Week number
 *                   totalSales:
 *                     type: number
 *                     format: double
 *                     description: Total sales for the week
 *       '404':
 *         description: No sales data found for the week
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /api/dashboard/getSalesPerMonth:
 *   get:
 *     tags:
 *       - Sales
 *     summary: Get sales per month
 *     description: Retrieves the total sales per month based on delivered orders
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Sales per month retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             monthlySales:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     description: Month number
 *                   totalSales:
 *                     type: number
 *                     format: double
 *                     description: Total sales for the month
 *       '404':
 *         description: No sales data found for the month
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */




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