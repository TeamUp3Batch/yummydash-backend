const express = require('express');
const router = express.Router();
const {sendOTP,verifyOTP} = require('../controllers/adminController');

// Route for authenticating users
router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

module.exports = router;