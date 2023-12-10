/**
 * @swagger
 * /api/driver/login:
 *   post:
 *     summary: Authenticate driver and get token
 *     description: Authenticate driver and return an access token.
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully authenticated and returned token
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             ordersDelivered:
 *               type: number
 *             rating:
 *               type: number
 *             token:
 *               type: string
 *             status:
 *               type: boolean
 *       401:
 *         description: Invalid email or password
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             status:
 *               type: boolean
 *       500:
 *         description: Internal Server Error occurred
 *         schema:
 *           $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * /api/driver/registerDriver:
 *   post:
 *     summary: Register a new driver
 *     description: Register a new driver and return an access token.
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered and returned token
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             token:
 *               type: string
 *             status:
 *               type: boolean
 *       400:
 *         description: All fields are mandatory or driver details already exist
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             status:
 *               type: boolean
 *       500:
 *         description: Internal Server Error occurred
 *         schema:
 *           $ref: '#/definitions/Error'
 */
/**
 * @swagger
 * /api/driver/updateDriverRating:
 *   post:
 *     summary: Update driver's rating
 *     description: Update the rating of a driver based on their delivered orders.
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the driver's rating
 *         schema:
 *           type: object
 *           properties:
 *             driverProfile:
 *               $ref: '#/definitions/Driver'
 *       400:
 *         description: driverId parameter is missing
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Internal Server Error occurred
 *         schema:
 *           $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * /api/driver/getOrdersPickedByDriver:
 *   get:
 *     summary: Get orders picked by a driver
 *     description: Retrieve orders picked up by a driver based on driverId.
 *     tags: [Driver]
 *     parameters:
 *       - in: query
 *         name: driverId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the driver
 *     responses:
 *       200:
 *         description: Successfully retrieved the orders picked by the driver
 *         schema:
 *           type: object
 *           properties:
 *             orders:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Cart'
 *             status:
 *               type: boolean
 *       400:
 *         description: driverId parameter is missing
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: No Pickup orders for this driver
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             status:
 *               type: boolean
 *       500:
 *         description: Internal Server Error occurred
 *         schema:
 *           $ref: '#/definitions/Error'
 */


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

