const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('../utilities/validator.js')
//app.post('/users', userValidationRules(), validate, (req, res) => {
 // User.create({
  //  username: req.body.username,
   // password: req.body.password,
 // }).then(users => res.json(users))
//})

const{ isAuthenticated } = require('../utilities/authenticate.js')
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/',isAuthenticated, userValidationRules(), validate, usersController.createUser);

router.put('/:id',isAuthenticated, usersController.updateUser);

router.delete('/:id',isAuthenticated, usersController.deleteUser);

module.exports =router;