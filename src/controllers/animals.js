const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Create a new contact
const createAnimal = async (req, res) => {
  // #swagger.tags=['Animals']
  const { animalType, color, commonName, coolFact, habitat, mainFoodSource, scientificName } = req.body;

  if (!commonName) {
    return res.status(400).json({ message: 'Content can not be empty!' });
  }

  const animal = {
    animalType,
    color,
    commonName,
    coolFact,
    habitat,
    mainFoodSource,
    scientificName
  };

  try {
    const result = await mongodb
      .getDatabase()
      .db('w03-through-w04')
      .collection('animals')
      .insertOne(animal);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while creating the Animal.',
    });
  }
};

// retrieve all animals
const getAllAnimals = async (req, res) => {
    // #swagger.tags=['Animals']
    const result = await mongodb.getDatabase().db("w03-through-w04").collection("animals").find();
    result.toArray().then((animals) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(animals);
    });
};

// retrieve animal by id
const getAnimalById = async (req, res) => {
    // #swagger.tags=['Animals']
    const animalId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("w03-through-w04").collection("animals").find({ _id: animalId });
    result.toArray().then((animals) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(animals[0]);
    });
};

// Update a animal by ID
const updateAnimal = async (req, res) => {
    // #swagger.tags=['Animals']
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Data to update can not be empty!' });
  }

  const animalId = new ObjectId(req.params.id);

  try {
    const result = await mongodb
      .getDatabase()
      .db('w03-through-w04')
      .collection('animals')
      .updateOne({ _id: animalId }, { $set: req.body });

    if (result.matchedCount === 0) {
      res.status(404).json({ message: `Cannot update Animal with id=${req.params.id}. Maybe Animal was not found!` });
    } else {
      res.status(200).json({ message: 'Animal was updated successfully.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating Animal with id=' + req.params.id });
  }
};

// Delete a animal by ID
const deleteAnimal = async (req, res) => {
    // #swagger.tags=['Animals']
  const animalId = new ObjectId(req.params.id);

  try {
    const result = await mongodb
      .getDatabase()
      .db('w03-through-w04')
      .collection('animals')
      .deleteOne({ _id: animalId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: `Cannot delete Animal with id=${req.params.id}. Maybe Animal was not found!` });
    } else {
      res.status(200).json({ message: 'Animal was deleted successfully!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Could not delete Animal with id=' + req.params.id });
  }
};

// Delete all animals
const deleteAllAnimals = async (req, res) => {
    // #swagger.tags=['Animals']
  try {
    const result = await mongodb
      .getDatabase()
      .db('w03-through-w04')
      .collection('animals')
      .deleteMany({});

    res.status(200).json({ message: `${result.deletedCount} Animals were deleted successfully!` });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while removing all animals.',
    });
  }
};

module.exports = {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
};
