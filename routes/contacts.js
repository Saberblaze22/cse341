const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('../utilities/validator.js')
//app.post('/contacts', userValidationRules(), validate, (req, res) => {
  //User.create({
   // username: req.body.username,
   // password: req.body.password,
 // }).then(contacts => res.json(contacts))
//})

const{ isAuthenticated } = require('../utilities/authenticate.js')
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getSingleContacts);

router.post('/',isAuthenticated, contactsController.createContacts);

router.put('/:id',isAuthenticated, contactsController.updateContacts);

router.delete('/:id',isAuthenticated, contactsController.deleteContacts);

module.exports =router;