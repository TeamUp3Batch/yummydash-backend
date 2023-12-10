/**
 * @swagger
 * /addMenuItemToRestaurant:
 *   post:
 *     tags:
 *       - Restaurant
 *     summary: Add a menu item to a restaurant
 *     description: Adds a new menu item to a restaurant's menu
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of the menu item
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: Description of the menu item
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: Price of the menu item
 *         in: formData
 *         required: true
 *         type: number
 *       - name: category
 *         description: Category of the menu item
 *         in: formData
 *         required: true
 *         type: string
 *       - name: restaurantId
 *         description: ID of the restaurant
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       '201':
 *         description: Menu item added successfully
 *         schema:
 *           type: object
 *           properties:
 *             restaurant:
 *               $ref: '#/definitions/Restaurant'
 *       '400':
 *         description: Missing required parameters
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '404':
 *         description: Restaurant not found
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
 * /updateMenuItemToRestaurant:
 *   post:
 *     tags:
 *       - Restaurant
 *     summary: Update a menu item in a restaurant
 *     description: Updates an existing menu item in a restaurant's menu
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of the menu item
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: Description of the menu item
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: Price of the menu item
 *         in: formData
 *         required: true
 *         type: number
 *       - name: category
 *         description: Category of the menu item
 *         in: formData
 *         required: true
 *         type: string
 *       - name: restaurantId
 *         description: ID of the restaurant
 *         in: formData
 *         required: true
 *         type: string
 *       - name: menuID
 *         description: ID of the menu item to update
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       '201':
 *         description: Menu item updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             restaurant:
 *               $ref: '#/definitions/Restaurant'
 *       '400':
 *         description: Missing required parameters
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '404':
 *         description: Restaurant not found or Menu item not found
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
 * /deleteMenuItem:
 *   post:
 *     tags:
 *       - Restaurant
 *     summary: Delete a menu item from a restaurant
 *     description: Deletes a menu item from a restaurant's menu
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantId
 *         description: ID of the restaurant
 *         in: formData
 *         required: true
 *         type: string
 *       - name: menuID
 *         description: ID of the menu item to delete
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Menu item deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             status:
 *               type: string
 *             menu:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/MenuItem'
 *       '400':
 *         description: Invalid parameters or Missing required parameters
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '404':
 *         description: Menu item not found
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

const express = require('express');
const router = express.Router();

const {
addMenuItemToRestaurant,
updateMenuItemToRestaurant,
deleteMenuItem
    
  
  } = require('../controllers/menuController');
router.post('/addMenuItemToRestaurant',addMenuItemToRestaurant);
router.post('/updateMenuItemToRestaurant',updateMenuItemToRestaurant);
router.post('/deleteMenuItem',deleteMenuItem);
module.exports = router;
