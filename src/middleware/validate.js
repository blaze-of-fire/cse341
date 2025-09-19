const validator = require('../helpers/validate');

const saveFurniture = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    color: 'required|string',
    description: "required|string",
    priceRange: 'required|string',
    estimatedAge: 'required|string',
    roomPlacement: 'required|string',
    pickupLocation: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveAnimals = (req, res, next) => {
  const validationRule = {
    animalType: 'required|string',
    color: 'required|string',
    commonName: 'required|string',
    coolFact: "required|string",
    habitat: 'required|string',
    mainFoodSource: 'required|string',
    scientificName: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


module.exports = {
  saveFurniture,
  saveAnimals
};