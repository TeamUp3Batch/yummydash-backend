/**
 * @swagger
 * /api/partner/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Partner login
 *     description: Authenticate a partner
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Partner credentials for login
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Partner'
 *     responses:
 *       '201':
 *         description: Successfully logged in
 *         schema:
 *           $ref: '#/definitions/Partner'
 *       '401':
 *         description: Invalid email or password
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             status:
 *               type: boolean
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             status:
 *               type: boolean
 */

/**
 * @swagger
 * /api/partner/registerPartner:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register new partner
 *     description: Register a new partner and associated restaurant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Partner details for registration
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Partner'
 *     responses:
 *       '201':
 *         description: Partner registered successfully
 *         schema:
 *           $ref: '#/definitions/Partner'
 *       '400':
 *         description: All fields are mandatory or Partner details already exist
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             status:
 *               type: boolean
 *       '404':
 *         description: Restaurant details already exist or Restaurant not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             status:
 *               type: boolean
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             status:
 *               type: boolean
 */
/**
 * @swagger
 * /api/partner/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Partner logout
 *     description: Logout a partner
 *     produces:
 *       - application/json
 *     responses:
 *       '201':
 *         description: Successfully logged out
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             token:
 *               type: null
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
 * /api/partner/getAllPartners:
 *   get:
 *     tags:
 *       - Partner
 *     summary: Get all partners
 *     description: Retrieve all partner details
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Successfully retrieved partners
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Partner'
 *       '404':
 *         description: No partners found
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
 * /api/partner/getNumberofPartners:
 *   get:
 *     tags:
 *       - Partner
 *     summary: Get number of partners
 *     description: Retrieve the total number of partners
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Successfully retrieved the number of partners
 *         schema:
 *           type: object
 *           properties:
 *             numberOfPartners:
 *               type: integer
 *       '404':
 *         description: No partners found
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
  authPartner,
  registerPartner, 
  logoutPartner ,
  getAllPartners,
  getNumberofPartners
  
} = require('../controllers/partnerController');
const protect = require('../middleware/authMiddleware');

// Route for authenticating users
router.post('/login', authPartner);
router.post('/registerPartner', registerPartner);
router.post('/logout', logoutPartner);
router.get('/getAllPartners', getAllPartners);
router.get('/getNumberofPartners', getNumberofPartners);

module.exports = router;getNumberofPartners

