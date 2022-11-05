equire('dotenv').config();

const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {requireUser} = require('./utils')
const {  getAllRoutinesByUser} = require('../db/routines')
const {   createUser, getUserByUsername} = require('../db/users');


// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    // request must have both
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    } else {
  
    try {
      const user = await getUserByUsername(username);

      const hashedPassword = user.password;
      const isValid = await bcrypt.compare(password, hashedPassword)
  
      if (user && isValid) {
        const {id, username} = user
        const token = jwt.sign({id, username}, process.env.JWT_SECRET)
        res.send({message: "you're logged in!", user, token});
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        });
      }
    } catch(error) {
      console.log(error);
      next(error);
    }
  } } )

// POST /api/users/register

usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

  
    try {
      const User = await getUserByUsername(username);
  
      if (User) {
        res.status(401) // needed in all api codes
        res.send({
          error: "401 error",
          name: 'UserExistsError',
          message: `User ${username} is already taken.`
        });


      }
      if (password.length < 8) {
        res.status(401) // needed in all api codes
        res.send({
            error: "401 error",
            name: 'PasswordRequirementsError',
            message: "Password Too Short!"
          });
      }
      const user = await createUser({
        username,
        password
      });
  
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET);
  
      res.send({ 
        message: "thank you for signing up",
        token,
        user 
      });
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });
//test
  module.exports = usersRouter;
