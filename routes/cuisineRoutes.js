/**
 * @swagger
 * tags:
 *   name: Cuisine
 *   description: Operations related to cuisines
 */

/**
 * @swagger
 * /api/cuisines/getAllCuisines:
 *   get:
 *     summary: Get all cuisines
 *     description: Retrieves all available cuisines.
 *     tags: [Cuisine]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful retrieval of cuisines
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Cuisine'
 *       500:
 *         description: Internal Server Error occurred
 *         schema:
 *           $ref: '#/definitions/Error'
 */
const express = require('express');
const router = express.Router();
const {getAllCuisines} = require('../controllers/cuisineController');
const protect = require('../middleware/authMiddleware');

// Route for user registration
router.get('/getAllCuisines', getAllCuisines);

module.exports = router;
