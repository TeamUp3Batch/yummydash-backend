/**
 * @swagger
 * /api/users/addNewUserAddress:
 *   post:
 *     summary: Add a new address to a user's profile
 *     description: Adds a new address to the user's profile based on the provided email.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               userAddress1:
 *                 type: string
 *                 description: The first line of the user's address.
 *               latitude:
 *                 type: string
 *                 description: Latitude of the address.
 *               longitude:
 *                 type: string
 *                 description: Longitude of the address.
 *               isPrimaryAddress:
 *                 type: boolean
 *                 description: Whether the address is the primary address or not.
 *     responses:
 *       '201':
 *         description: Address added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 address:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/UserAddress'
 *                 status:
 *                   type: string
 *                   description: Status of the operation (success).
 *       '404':
 *         description: User not found for the provided email.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message ('User not found').
 *       '500':
 *         description: Internal Server Error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message ('Internal Server Error').
 *
 * definitions:
 *   UserAddress:
 *     type: object
 *     properties:
 *       userAddress1:
 *         type: string
 *       latitude:
 *         type: string
 *       longitude:
 *         type: string
 *       isPrimaryAddress:
 *         type: boolean
 */

/**
 * @swagger
 * /api/users/updatePrimaryAddress:
 *   post:
 *     summary: Update user's primary address
 *     description: Updates the primary address for a user based on the provided email and address ID.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               id:
 *                 type: string
 *                 description: The ID of the address to be set as primary.
 *     responses:
 *       '201':
 *         description: Primary address updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 address:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/UserAddress'
 *                 status:
 *                   type: string
 *                   description: Status of the operation (success).
 *       '400':
 *         description: Bad request - missing email or ID.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message ('Bad Request').
 *       '404':
 *         description: User or address not found for the provided email or ID.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message ('User not found' or 'Address not found').
 *       '500':
 *         description: Internal Server Error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message ('Internal Server Error').
 *
 * definitions:
 *   UserAddress:
 *     type: object
 *     properties:
 *       userAddress1:
 *         type: string
 *       latitude:
 *         type: string
 *       longitude:
 *         type: string
 *       isPrimaryAddress:
 *         type: boolean
 */
/**
 * @swagger
 * /api/users/deleteUserAddress:
 *   delete:
 *     summary: Delete a user's address
 *     description: Deletes a user's address based on the provided email and address ID.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               id:
 *                 type: string
 *                 description: The ID of the address to be deleted.
 *     responses:
 *       '201':
 *         description: Address deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 addresses:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/UserAddress'
 *                 status:
 *                   type: string
 *                   description: Status of the operation (success).
 *       '400':
 *         description: Bad request - missing email or ID.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message ('Missing email or id').
 *       '404':
 *         description: User or address not found for the provided email or ID.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message ('User not found' or 'Address not found').
 *       '500':
 *         description: Internal Server Error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message ('Internal Server Error').
 *
 * definitions:
 *   UserAddress:
 *     type: object
 *     properties:
 *       userAddress1:
 *         type: string
 *       latitude:
 *         type: string
 *       longitude:
 *         type: string
 *       isPrimaryAddress:
 *         type: boolean
 */
/**
 * @swagger
 * /api/users/getAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieves all users excluding passwords.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful retrieval of users.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       404:
 *         description: No users found.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('No users').
 *       500:
 *         description: Internal Server Error occurred.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('Internal Server Error').
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       address:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             userAddress1:
 *               type: string
 *             latitude:
 *               type: string
 *             longitude:
 *               type: string
 *             isPrimaryAddress:
 *               type: boolean
 */

/**
 * @swagger
 * /api/users/getAllUsersForSalesforce:
 *   get:
 *     summary: Get all users for Salesforce
 *     description: Retrieves all users excluding passwords. Also Restructuee the data to match the Salesforce schema.
 *     
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful retrieval of users.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       404:
 *         description: No users found.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('No users').
 *       500:
 *         description: Internal Server Error occurred.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('Internal Server Error').
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       userAddress1:
 *         type: string
 *       latitude:
 *        type: string
 *       longitude:
 *       type: string
 *
 */

/**
 * @swagger
 * /api/users/getAllUsersForSalesforceMapData:
 *   get:
 *     summary: Get all users for Salesforce
 *     description: Retrieves all users excluding passwords. Also Restructuee the data to match the Salesforce schema.
 *     
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful retrieval of users.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       404:
 *         description: No users found.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('No users').
 *       500:
 *         description: Internal Server Error occurred.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('Internal Server Error').
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       latitude:
 *        type: string
 *       longitude:
 *       type: string
 *
 */

/**
 * @swagger
 * /api/users/getNumberofUsers:
 *   get:
 *     summary: Get the number of users
 *     description: Retrieves the count of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful retrieval of the number of users.
 *         schema:
 *           properties:
 *             numberOfUsers:
 *               type: number
 *               description: The count of users.
 *       404:
 *         description: No users found.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('No User').
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
 * /api/users/updateUserProfileByEmail:
 *   post:
 *     summary: Update user profile by email
 *     description: Updates a user's profile based on the provided email.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The updated first name of the user.
 *               lastName:
 *                 type: string
 *                 description: The updated last name of the user.
 *               phoneNumber:
 *                 type: string
 *                 description: The updated phone number of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *     responses:
 *       201:
 *         description: User profile updated successfully.
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Bad request - missing user data.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('User data cannot be missing!').
 *       404:
 *         description: User not found for the provided email.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('User not found').
 *       500:
 *         description: Internal Server Error occurred.
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               description: Error message ('Internal Server Error').
 */





const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/authController');
const {addNewUserAddress,
  updatePrimaryAddress,
  deleteUserAddress,
  getAllUsers,
  getNumberofUsers,
  updateUserProfileByEmail,
  getAllUsersForSalesforce,
  getAllUsersForSalesforceMapData
} = require('../controllers/userController');
// const protect = require('../middleware/authMiddleware');

// Route for user registration
router.post('/signup', registerUser);
router.post('/addNewAddress', addNewUserAddress);
router.post('/updatePrimaryAddress', updatePrimaryAddress);
router.post('/deleteUserAddress', deleteUserAddress);
router.get('/getAllUsers', getAllUsers);
router.get('/getNumberofUsers', getNumberofUsers);
router.get('/getAllUsersForSalesforce', getAllUsersForSalesforce);
router.get('/getAllUsersForSalesforceMapData', getAllUsersForSalesforceMapData);
router.post('/updateUserProfileByEmail', updateUserProfileByEmail);

module.exports = router;
