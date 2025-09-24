const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

const furnitureController = require('../controllers/furniture');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate")

router.param('id', (req, res, next, value) => {
  if (!ObjectId.isValid(value)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid animal ID format'
    });
  }
  next();
});

router.get("/", furnitureController.getAllFurniture);

router.get("/:id", furnitureController.getFurnitureById);

router.post("/", isAuthenticated, validation.saveFurniture, furnitureController.createFurniture);

router.put("/:id", isAuthenticated, validation.saveFurniture, furnitureController.updateFurniture);

router.delete("/:id", isAuthenticated, furnitureController.deleteFurniture);


module.exports = router;
