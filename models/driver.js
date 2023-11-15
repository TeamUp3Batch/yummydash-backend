const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const driverSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  phoneNumber: {type: String, required: false},
  ordersDelivered: {type:Number},
  userRating:{type:Number}

});

driverSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {
    expiresIn: '7d',
  });
  return token;
};

const Driver = mongoose.model('drivers', driverSchema);

module.exports = {Driver};
