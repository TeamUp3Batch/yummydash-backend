/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Restaurant API
 *   description: RESTful API for managing restaurants
 *   version: 1.0.0
 * paths:
 *   /api/restaurants/getAllRestaurants:
 *     get:
 *       summary: Retrieve all restaurants
 *       description: Returns a list of all restaurants available.
 *       tags:
 *         - Restaurant
 *       responses:
 *         '200':
 *           description: A list of restaurants
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/Restaurant'
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *       operationId: getAllRestaurants
 */
/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Restaurant API
 *   description: RESTful API for managing restaurants
 *   version: 1.0.0
 * paths:
 *   /api/restaurants/getRestaurantsByCuisine:
 *     get:
 *       summary: Get restaurants by cuisine
 *       description: Retrieve restaurants based on the specified cuisine.
 *       tags:
 *         - Restaurant
 *       parameters:
 *         - in: query
 *           name: cuisine
 *           required: true
 *           description: The cuisine type to filter the restaurants.
 *           schema:
 *             type: string
 *         - in: query
 *           name: sort
 *           required: false
 *           description: Sort option (rating or duration) for the restaurants.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns restaurants based on cuisine.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/Restaurant'
 *         '400':
 *           description: Cuisine parameter is missing.
 *         '404':
 *           description: No restaurants found for the specified cuisine.
 *         '500':
 *           description: Internal Server Error.
 *
 *   /api/restaurants/getMenuItemsByRestaurant:
 *     get:
 *       summary: Get menu items by restaurant ID
 *       description: Retrieve menu items for a specific restaurant based on its ID.
 *       tags:
 *         - Restaurant
 *       parameters:
 *         - in: query
 *           name: restaurantId
 *           required: true
 *           description: The ID of the restaurant to retrieve menu items.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns menu items for the specified restaurant.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   menuItem:
 *                     type: array
 *                     items:
 *                       type: object
 *         '400':
 *           description: Restaurant ID parameter is missing.
 *         '404':
 *           description: Restaurant not found or no menu items available.
 *         '500':
 *           description: Internal Server Error.
 */
/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Restaurant API
 *   description: RESTful API for managing restaurants
 *   version: 1.0.0
 * paths:
 *   /api/restaurants/getRestaurantDetailsById:
 *     get:
 *       summary: Get restaurant details by ID
 *       description: Retrieve details of a restaurant based on its ID.
 *       tags:
 *         - Restaurant
 *       parameters:
 *         - in: query
 *           name: restaurantId
 *           required: true
 *           description: The ID of the restaurant to retrieve details.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns details of the specified restaurant.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Restaurant'
 *         '400':
 *           description: Restaurant ID parameter is missing.
 *         '404':
 *           description: Restaurant not found.
 *         '500':
 *           description: Internal Server Error.
 *
 *   /api/restaurants/getRestaurantMenuByCategory:
 *     get:
 *       summary: Get restaurant menu by category
 *       description: Retrieve menu items of a restaurant based on its ID and category.
 *       tags:
 *         - Restaurant
 *       parameters:
 *         - in: query
 *           name: restaurantId
 *           required: true
 *           description: The ID of the restaurant to retrieve menu items.
 *           schema:
 *             type: string
 *         - in: query
 *           name: category
 *           required: true
 *           description: The category of menu items to retrieve.
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful operation. Returns menu items for the specified restaurant and category.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   menuItems:
 *                     type: array
 *         '400':
 *           description: Restaurant ID or category parameter is missing.
 *         '404':
 *           description: Restaurant not found or no menu items found in the specified category.
 *         '500':
 *           description: Internal Server Error.
 */
/**
 * @swagger
 * tags:
 *   name: Restaurant
 *   description: Endpoints related to restaurants
 */
/**
 * @swagger
 * /api/restaurants/restaurantSearch:
 *   get:
 *     tags:
 *       - Restaurant
 *     summary: Search restaurants
 *     description: Get restaurants based on search criteria
 *     parameters:
 *       - name: searchItem
 *         in: query
 *         description: Search query for restaurants
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             restaurants:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Restaurant'
 */
/**
 * @swagger
 * /api/restaurants/updateRestaurantRating:
 *   post:
 *     tags:
 *       - Restaurant
 *     summary: Update restaurant rating
 *     description: Update the rating for a restaurant based on delivered orders
 *     parameters:
 *       - name: restaurantId
 *         in: body
 *         description: ID of the restaurant
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             restaurantId:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful update
 *         schema:
 *           type: object
 *           properties:
 *             restaurantProfile:
 *               $ref: '#/definitions/Restaurant'
 */
/**
 * @swagger
 * /api/restaurants/updateRestaurantDetails:
 *   post:
 *     tags:
 *       - Restaurant
 *     summary: Update restaurant details
 *     description: Update details of a restaurant
 *     parameters:
 *       - name: RestaurantDetails
 *         in: body
 *         description: Restaurant details to be updated
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Restaurant'
 *     responses:
 *       '201':
 *         description: Restaurant details updated successfully
 *         schema:
 *           $ref: '#/definitions/Restaurant'
 */

const express = require('express')
const router = express.Router()
const {
    getAllRestaurants,
    getRestaurantsByCuisine,
    getMenuItemsByRestaurant,
    getRestaurantDetailsById,
    getRestaurantMenuByCategory,
    getRestaurantsByRating,
    getRestaurantMenusByPrice,
    getRestaurantMenusBelowPrice,
    getMenusBelowDeliveryMinTime,
    getMenusBelowDeliveryMedTime,
    getMenusBelowDeliveryMaxTime,
    updateRestaurantRating,
    updateRestaurantDetails,
    restaurantSearch,
} = require('../controllers/restaurantController')

// Added by Kavitha
router.get('/getAllRestaurants', getAllRestaurants)
router.get('/getRestaurantsByCuisine', getRestaurantsByCuisine)
router.get('/getMenuItemsByRestaurant', getMenuItemsByRestaurant)
router.get('/getRestaurantDetailsById', getRestaurantDetailsById)
router.get('/getRestaurantMenuByCategory', getRestaurantMenuByCategory)
router.get('/restaurantSearch', restaurantSearch)
router.post('/updateRestaurantRating', updateRestaurantRating)
router.post('/updateRestaurantDetails', updateRestaurantDetails)

// Added by Farhana
router.get('/getRestaurantsByRating', getRestaurantsByRating)
router.get('/getRestaurantMenusByPrice', getRestaurantMenusByPrice)
router.get('/getRestaurantMenusBelowPrice', getRestaurantMenusBelowPrice)
router.get('/getMenusBelowDeliveryMinTime', getMenusBelowDeliveryMinTime)
router.get('/getMenusBelowDeliveryMedTime', getMenusBelowDeliveryMedTime)
router.get('/getMenusBelowDeliveryMaxTime', getMenusBelowDeliveryMaxTime)

module.exports = router
