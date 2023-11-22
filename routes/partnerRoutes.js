const express = require('express');
const router = express.Router();

const {
  authPartner,
  registerPartner, 
  logoutPartner ,
  getAllPartners
} = require('../controllers/partnerController');
const protect = require('../middleware/authMiddleware');

// Route for authenticating users
router.post('/login', authPartner);
router.post('/registerPartner', registerPartner);
router.post('/logout', logoutPartner);
router.get('/getAllPartners', getAllPartners);

module.exports = router;

