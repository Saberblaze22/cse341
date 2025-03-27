const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) =>{
    //#swagger.tags=['Contacts]
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingleContacts = async(req, res) =>{
    //#swagger.tags=['Contacts]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId });
    result.toArray().then((users)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createContacts=async(req, res) =>{
    //#swagger.tags=['Contacts]
    const user={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response=await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged){
        res.status(204).send()
    }else{
        res.status(500).json(response.error || 'some error occurred while updating server.');
    }
};

const updateContacts=async(req, res) =>{
    //#swagger.tags=['Contacts]
    const userId = new ObjectId(req.params.id);
    const user={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response=await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId }, user);
    if (response.modifiedCount > 0){
        res.status(204).send()
    }else{
        res.status(500).json(response.error || 'some error occurred while updating server.');
    }
};

const deleteContacts=async(req, res) =>{
    //#swagger.tags=['Contacts]
    const userId = new ObjectId(req.params.id);
    const response=await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId });
    if (response.deletedCount > 0){
        res.status(204).send()
    }else{
        res.status(500).json(response.error || 'some error occurred while updating server.');
    }
};

module.exports={
    getAllContacts,
    getSingleContacts,
    createContacts,
    updateContacts,
    deleteContacts
};