/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and generate token
 *     description: Authenticate a user by email and password, and generate a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '201':
 *         description: User authenticated successfully. Returns user details and token.
 *       '401':
 *         description: Invalid email or password.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout the user
 *     description: Logout the authenticated user.
 *     tags: [Authentication]
 *     responses:
 *       '201':
 *         description: User logged out successfully.
 */

const express = require('express');
const router = express.Router();
const { authUser, logoutUser } = require('../controllers/authController');

// Route for authenticating users
router.post('/login', authUser);
router.post('/logout', logoutUser);

module.exports = router;
