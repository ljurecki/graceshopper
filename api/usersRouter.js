require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils')
const {
  createUser,
  getUserByUsername,
  getUser,
  getAllProductsByUser
} = require('../db/')

const {
  UserDoesNotExistError,
  PasswordTooShortError,
  UserTakenError,
} = require('../errors');

// POST /api/users/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.send({
        error: 'MissingUsernameOrPassword',
        name: 'Missing username or password',
        message: 'Please enter a username and password',
      });
    } else {
      const user = await getUser(req.body);
      if (user) {
        const token = jwt.sign(user, JWT_SECRET);
        res.send({
          name: 'LoginSuccess',
          message: "you're logged in!",
          token,
          user,
        });
      } else {
        res.send({
          error: 'UserNotFound',
          name: 'User not found',
          message: UserDoesNotExistError(username),
        });
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});


// POST /api/users/register

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.send({
        error: 'MissingUsernameOrPassword',
        name: 'Missing username or password',
        message: 'Please enter a username and password',
      });
    } else if (password.length < 8) {
      res.send({
        error: 'PasswordTooShort',
        name: 'PasswordTooShort',
        message: PasswordTooShortError(),
      });
    } else {
      const _user = await getUserByUsername(username);
      if (_user) {
        res.send({
          error: 'Username already taken',
          name: 'UsernameAlreadyTaken',
          message: UserTakenError(_user.username),
        });
      } else {
        const user = await createUser({ username, password });
        if (user) {
          const token = jwt.sign(user, JWT_SECRET);
          res.send({
            name: 'RegisterSuccess',
            message: "you're logged in!",
            token,
            user,
          });
        }
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.get('/me', requireUser, async (req, res) => {
  res.send(req.user);
});

router.get('/:username/products', async (req, res, next) => {
  try {
    const { username } = req.params;
    if (req.user && req.user.username === username) {
      const userProducts = await getAllProductsByUser({ username });
      res.send(userProducts);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});


module.exports = router;
