const express = require('express');
const router = express.Router();

const {
  authPartner,
  registerPartner, 
  logoutPartner 
} = require('../controllers/partnerController');
const protect = require('../middleware/authMiddleware');

// Route for authenticating users
router.post('/login', authPartner);
router.post('/registerPartner', registerPartner);
router.post('/logout', logoutPartner);

module.exports = router;

