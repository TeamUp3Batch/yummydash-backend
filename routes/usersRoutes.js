const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/authController');
const {addNewUserAddress,
  updatePrimaryAddress,
} = require('../controllers/userController');
// const protect = require('../middleware/authMiddleware');

// Route for user registration
router.post('/signup', registerUser);
router.post('/addNewAddress', addNewUserAddress);
router.put('/updatePrimaryAddress/:addressId', updatePrimaryAddress);

module.exports = router;
