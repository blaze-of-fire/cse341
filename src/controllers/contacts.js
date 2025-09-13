const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Create a new contact
const createContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName) {
    return res.status(400).json({ message: 'Content can not be empty!' });
  }

  const contact = {
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday,
  };

  try {
    const result = await mongodb
      .getDatabase()
      .db('w01-project-2')
      .collection('contacts')
      .insertOne(contact);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while creating the Contact.',
    });
  }
};

// retrieve all contacts
const getAllContacts = async (req, res) => {
    // #swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db("w01-project-2").collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

// retrieve contact by id
const getContactById = async (req, res) => {
    // #swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("w01-project-2").collection("contacts").find({ _id: userId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

// Update a contact by ID
const updateContact = async (req, res) => {
    // #swagger.tags=['Contacts']
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Data to update can not be empty!' });
  }

  const contactId = new ObjectId(req.params.id);

  try {
    const result = await mongodb
      .getDatabase()
      .db('w01-project-2')
      .collection('contacts')
      .updateOne({ _id: contactId }, { $set: req.body });

    if (result.matchedCount === 0) {
      res.status(404).json({ message: `Cannot update Contact with id=${req.params.id}. Maybe Contact was not found!` });
    } else {
      res.status(200).json({ message: 'Contact was updated successfully.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating Contact with id=' + req.params.id });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
    // #swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);

  try {
    const result = await mongodb
      .getDatabase()
      .db('w01-project-2')
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: `Cannot delete Contact with id=${req.params.id}. Maybe Contact was not found!` });
    } else {
      res.status(200).json({ message: 'Contact was deleted successfully!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Could not delete Contact with id=' + req.params.id });
  }
};

// Delete all contacts
const deleteAllContacts = async (req, res) => {
    // #swagger.tags=['Contacts']
  try {
    const result = await mongodb
      .getDatabase()
      .db('w01-project-2')
      .collection('contacts')
      .deleteMany({});

    res.status(200).json({ message: `${result.deletedCount} Contacts were deleted successfully!` });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Some error occurred while removing all contacts.',
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  deleteAllContacts,
};
