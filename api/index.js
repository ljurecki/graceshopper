const express = require('express');
const router = express.Router();

const usersRouter = require('./usersRouter');
router.use('/users', usersRouter);

const productsRouter = require ('./productsRouter');
router.use('/products', productsRouter);

router.get('*', (req, res) => {
    res.status(404).send({
      message: 'Page not found',
    });
  });

module.exports = router;
