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
const getAllFurniture = async (req, res) => {
    // #swagger.tags=['Furniture']
    const result = await mongodb.getDatabase().db("w03-through-w04").collection("furniture").find();

    result.toArray().then((furniture) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(furniture);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message || err });
    });
};

// retrieve furniture by id
const getFurnitureById = async (req, res) => {
    // #swagger.tags=['Furniture']
    const furnitureId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("w03-through-w04").collection("furniture").find({ _id: furnitureId });

    result.toArray().then((furniture) => {
        if (!furniture[0]) {
          return res.status(404).json({ message: 'Furniture not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(furniture[0]);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message || err });
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
