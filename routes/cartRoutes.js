/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the shopping cart
 */

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Get cart details for checkout
 *     description: Get cart details for the checkout process.
 *     tags: [Cart]
 *     responses:
 *       '200':
 *         description: Cart details retrieved successfully.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/cart/placeOrder:
 *   post:
 *     summary: Place an order
 *     description: Place an order using Stripe for payment.
 *     tags: [Cart]
 *     responses:
 *       '200':
 *         description: Order placed successfully.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/cart/updateCart:
 *   post:
 *     summary: Update cart
 *     description: Update items in the cart, add or remove items.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *               menuId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               userId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Cart updated successfully.
 *       '404':
 *         description: Item not found or cart not found.
 *       '500':
 *         description: Internal Server Error.
 */
/**
 * @swagger
 * /api/cart/removeItemOrRemoveCart:
 *   post:
 *     summary: Remove item or delete cart
 *     description: Remove a specific menu item from the cart or delete the entire cart.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *               menuId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Menu item removed from cart or cart deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/definitions/Cart'
 *       '404':
 *         description: Cart not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/cart/deleteCart:
 *   post:
 *     summary: Delete cart
 *     description: Delete an entire cart based on the provided cart ID.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Cart deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *       '400':
 *         description: Invalid cart ID or cart not eligible for deletion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/definitions/Cart'
 *       '404':
 *         description: Cart not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /api/cart/getPendingOrdersByRestaurantId:
 *   get:
 *     summary: Get pending orders by restaurant ID
 *     description: Retrieves pending orders based on the provided restaurant ID.
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         type: string
 *         required: true
 *         description: The ID of the restaurant to fetch pending orders.
 *     responses:
 *       200:
 *         description: Successful retrieval of pending orders.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Cart'
 *       400:
 *         description: Restaurant ID parameter is missing.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('Restaurant ID parameter is missing').
 *       404:
 *         description: No pending orders found for the provided restaurant ID.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('No pending orders found').
 *       500:
 *         description: Internal Server Error occurred.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('Internal Server Error').
 */

/**
 * @swagger
 * /api/cart/getAllOrdersByUserId:
 *   get:
 *     summary: Get all orders by user ID
 *     description: Retrieves all orders based on the provided user ID.
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         type: string
 *         required: true
 *         description: The ID of the user to fetch all orders.
 *     responses:
 *       200:
 *         description: Successful retrieval of all orders by user ID.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Cart'
 *       400:
 *         description: userID parameter is missing.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('userID parameter is missing').
 *       404:
 *         description: No orders found for the provided user ID.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('No pending orders found').
 *       500:
 *         description: Internal Server Error occurred.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('Internal Server Error').
 */


const express = require('express')
const {Cart} = require('../models/cart')
const router = express.Router()
const {
    updateCart,
    removeItemOrRemoveCart,
    deleteCart,
    updateOrderStatus,
    getPendingOrdersByRestaurantId,
    getAllOrdersByUserId,
    getAllOrdersByRestaurantId,
    getOrderDetailsByOrderId,
    updateDriverRatingByUser,
    updateRestaurantRatingByUser,
} = require('../controllers/cartController')
const { placeOrderByStripe } = require('../controllers/stripeOrderController')
const {
    getCartDetailsToCheckout,
} = require('../controllers/checkoutController')

// Route for user registration
router.post('/checkout', getCartDetailsToCheckout)
router.post('/placeOrder', placeOrderByStripe)
router.post('/updateCart', updateCart)
router.post('/removeItemOrRemoveCart', removeItemOrRemoveCart)
router.post('/deleteCart', deleteCart)

router.post('/updateOrderStatus', updateOrderStatus)

router.post('/updateDriverRatingByUser', updateDriverRatingByUser)
router.post('/updateRestaurantRatingByUser', updateRestaurantRatingByUser)

router.get('/getPendingOrdersByRestaurantId', getPendingOrdersByRestaurantId)
router.get('/getAllOrdersByUserId', getAllOrdersByUserId)
router.get('/getAllOrdersByRestaurantId', getAllOrdersByRestaurantId)
router.get('/getOrderDetailsByOrderId', getOrderDetailsByOrderId)
module.exports = router
