const express = require('express');
const router = express.Router();

const {
  authPartner,
  registerPartner, 
  logoutPartner ,
  getAllPartners,
  getNumberofPartners,
  updatePartnerProfileByEmail
  
} = require('../controllers/partnerController');
const protect = require('../middleware/authMiddleware');

// Route for authenticating users
router.post('/login', authPartner);
router.post('/registerPartner', registerPartner);
router.post('/logout', logoutPartner);
router.post('/updatePartnerProfileByEmail', updatePartnerProfileByEmail);
router.get('/getAllPartners', getAllPartners);
router.get('/getNumberofPartners', getNumberofPartners);


module.exports = router;

