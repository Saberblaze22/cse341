const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('./validator.js')
app.post('/contacts', userValidationRules(), validate, (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then(contacts => res.json(contacts))
})

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getSingleContacts);

router.post('/', contactsController.createContacts);

router.put('/:id', contactsController.updateContacts);

router.delete('/:id', contactsController.deleteContacts);

module.exports =router;