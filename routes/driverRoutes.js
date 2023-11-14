const express = require('express');
const router = express.Router();

const {

  authDriver,
  registerDriver, 
  logoutDriver 

} = require('../controllers/driverController');
const protect = require('../middleware/authMiddleware');

// Route for authenticating users
router.post('/login', authDriver);
router.post('/registerDriver', registerDriver);
router.post('/logout', logoutDriver);

module.exports = router;

