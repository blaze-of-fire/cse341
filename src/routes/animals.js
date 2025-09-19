const express = require('express');
const router = express.Router();

const animalsController = require('../controllers/animals');
const validation = require('../middleware/validate');

router.param('id', (req, res, next, value) => {
  if (!ObjectId.isValid(value)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid furniture ID format'
    });
  }
  next();
});

router.get("/", animalsController.getAllAnimals);

router.get("/:id", animalsController.getAnimalById);

router.post("/", validation.saveAnimals, animalsController.createAnimal);

router.put("/:id", validation.saveAnimals, animalsController.updateAnimal);

router.delete("/:id", animalsController.deleteAnimal);


module.exports = router;
