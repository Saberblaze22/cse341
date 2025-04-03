const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) =>{
    //#swagger.tags=['Contacts]
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contact)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    });
};

const getSingleContacts = async(req, res) =>{
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactId });
    result.toArray().then((comtact)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact[0]);
    });
};

const createContacts=async(req, res) =>{
    //#swagger.tags=['Contacts]
    const contact={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        address: req.body.acknowledged,
        phoneNumber: req.body.phoneNumber
    };
    const response=await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged){
        res.status(204).send()
    }else{
        res.status(500).json(response.error || 'some error occurred while updating server.');
    }
};

const updateContacts=async(req, res) =>{
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const contact={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response=await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: contactId }, contact);
    if (response.modifiedCount > 0){
        res.status(204).send()
    }else{
        res.status(500).json(response.error || 'some error occurred while updating server.');
    }
};

const deleteContacts=async(req, res) =>{
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const response=await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: contactId });
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