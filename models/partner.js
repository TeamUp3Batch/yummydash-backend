const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {Restaurant} = require('./restaurant');

const partnerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  phoneNumber: {type: String, required: false},
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },

});

partnerSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
    expiresIn: '7d',
  });
  return token;
};

const Partner = mongoose.model('partner', partnerSchema);

module.exports = {Partner};
