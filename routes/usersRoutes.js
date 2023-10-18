const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/authController');
const {addNewUserAddress} = require('../controllers/userController');
// const protect = require('../middleware/authMiddleware');

// Route for user registration
router.post('/signup', registerUser);
router.post('/addNewAddress', addNewUserAddress);

module.exports = router;
