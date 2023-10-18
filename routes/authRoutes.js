const express = require('express');
const router = express.Router();
const {authUser, logoutUser} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

// Route for authenticating users
router.post('/login', authUser);
router.post('/logout', logoutUser);

module.exports = router;
