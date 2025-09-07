const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    const result = await mongodb.getDatabase().db("w01-project-2").collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getContactById = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("w01-project-2").collection("contacts").find({ _id: userId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

module.exports = {
    getAllContacts,
    getContactById
};