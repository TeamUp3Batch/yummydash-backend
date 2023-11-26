const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/authController');
const {addNewUserAddress,
  updatePrimaryAddress,
  deleteUserAddress,
  getAllUsers,
  getNumberofUsers,
  getUserProfileByEmail,
  updateUserProfileByEmail
} = require('../controllers/userController');
// const protect = require('../middleware/authMiddleware');

// Route for user registration
router.post('/signup', registerUser);
router.post('/addNewAddress', addNewUserAddress);
router.post('/updatePrimaryAddress', updatePrimaryAddress);
router.post('/deleteUserAddress', deleteUserAddress);
router.get('/getAllUsers',getAllUsers);
router.get('/getNumberofUsers',getNumberofUsers);
router.get('/getUserProfileByEmail', getUserProfileByEmail);
router.post('/updateUserProfileByEmail', updateUserProfileByEmail);
module.exports = router;
