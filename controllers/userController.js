const {User} = require('../models/user');

const addNewUserAddress = async (req, res) => {
  try {
    User.findOneAndUpdate(
        {email: req.body.email},
        {
          $push: {
            address: {
              unitNumber: req.body.unitNumber,
              street: req.body.street,
              city: req.body.city,
              state: req.body.state,
              zipCode: req.body.zipCode,
              country: req.body.country,
            },
          },
        },
        {new: true, upsert: true},
    )
        .then(async (result) => {
          res.status(201).send({
            address: result.address,
            status: 'successs',
          });
        })
        .catch((err) => {
          res.status(500).send({mongoError: err});
        });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports = {
  addNewUserAddress,
};
