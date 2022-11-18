const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db/users');

export const registerUser = async (username, password) => {
  try {
    console.log(username, password)
    const response = await fetch(`${baseURL}users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    const result = await response.json();
    console.log(result)
    return result;

  } catch (error) {
    console.error(error)
  }
}

router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

router.get('/health', async (req, res) => {
  res.send({
    message: 'All is well',
  });
});

const usersRouter = require('./usersRouter');
router.use('/users', usersRouter);

const productsRouter = require('./productsRouter');
router.use('/products', productsRouter);

const audiobooksRouter = require ('./audiobooksRouter');
router.use('/audiobooks', audiobooksRouter);

router.get('*', (req, res) => {
  res.status(404).send({
    message: 'Page not found!!',
  });
});

router.use((err, req, res) => {
  res.send({
    message: err,
  });
});

module.exports = router;
