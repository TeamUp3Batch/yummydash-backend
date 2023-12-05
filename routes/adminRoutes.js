/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin authentication endpoints
 */

/**
 * @swagger
 * /api/admin/sendOTP:
 *   post:
 *     summary: Sends OTP to admin's email
 *     description: Sends an OTP to the provided admin email for authentication.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               admin_email:
 *                 type: string
 *                 description: The email address of the admin.
 *     responses:
 *       '200':
 *         description: OTP sent successfully.
 *       '404':
 *         description: Wrong admin email entered.
 *       '500':
 *         description: Failed to send email.
 */

/**
 * @swagger
 * /api/admin/verifyOTP:
 *   post:
 *     summary: Verify OTP for admin login
 *     description: Verifies the OTP provided by the admin for login.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               admin_email:
 *                 type: string
 *                 description: The email address of the admin.
 *               otp:
 *                 type: string
 *                 description: The OTP received by the admin.
 *     responses:
 *       '200':
 *         description: OTP verified successfully.
 *       '401':
 *         description: Invalid OTP or OTP expired.
 *       '404':
 *         description: Wrong admin email entered or OTP not found.
 *       '500':
 *         description: Internal Server Error.
 */

const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controllers/adminController');

// Route for authenticating users
router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

module.exports = router;
