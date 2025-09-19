const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Create a new furniture
const createFurniture = async (req, res) => {
  // #swagger.tags=['Furniture']
  const { name, color, description, priceRange, estimatedAge, roomPlacement, pickupLocation } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Content can not be empty!' });
  }

  const furniture = {
    name,
    color,
    description,
    priceRange,
    estimatedAge,
    roomPlacement,
    pickupLocation
  };

  try {
    const result = await mongodb
      .getDatabase()
      .db('w03-through-w04')
      .collection('furniture')
      .insertOne(furniture);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while creating the Furniture.',
    });
  }
};

// retrieve all furniture
const getAllFurniture = (req, res) => {
    // #swagger.tags=['Furniture']
  mongodb
    .getDatabase()
    .db('w03-through-w04')
    .collection('furniture')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

// retrieve furniture by id
const getFurnitureById = (req, res) => {
    // #swagger.tags=['Furniture']
    const furnitureId = new ObjectId(req.params.id);
    mongodb
    .getDatabase()
    .db('w03-through-w04')
    .collection('furniture')
    .find({ _id: furnitureId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

// Update a furniture by ID
const updateFurniture = async (req, res) => {
    // #swagger.tags=['Furniture']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(412).json('Must use a valid furniture id to update a piece of furniture.');
    }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Data to update can not be empty!' });
  }

  const furnitureId = new ObjectId(req.params.id);

  try {
    const result = await mongodb
      .getDatabase()
      .db('w03-through-w04')
      .collection('furniture')
      .updateOne({ _id: furnitureId }, { $set: req.body });

    if (result.matchedCount === 0) {
      res.status(404).json({ message: `Cannot update Furniture with id=${req.params.id}. Maybe Furniture was not found!` });
    } else {
      res.status(200).json({ message: 'Furniture was updated successfully.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating Furniture with id=' + req.params.id });
  }
};

// Delete a furniture by ID
const deleteFurniture = async (req, res) => {
    // #swagger.tags=['Furniture']

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid furniture id to delete a piece of furniture.');
    }

  const furnitureId = new ObjectId(req.params.id);

  try {
    const result = await mongodb
      .getDatabase()
      .db('w03-through-w04')
      .collection('furniture')
      .deleteOne({ _id: furnitureId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: `Cannot delete Furniture with id=${req.params.id}. Maybe Furniture was not found!` });
    } else {
      res.status(200).json({ message: 'Furniture deleted successfully!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Could not delete Furniture with id=' + req.params.id });
  }
};

// Delete all furniture
const deleteAllFurniture = async (req, res) => {
    // #swagger.tags=['Furniture']
  try {
    const result = await mongodb
      .getDatabase()
      .db('w03-through-w04')
      .collection('furniture')
      .deleteMany({});

    res.status(200).json({ message: `${result.deletedCount} Furniture were deleted successfully!` });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while removing all furniture.',
    });
  }
};

module.exports = {
    createFurniture,
    getAllFurniture,
    getFurnitureById,
    updateFurniture,
    deleteFurniture
};
