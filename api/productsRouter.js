const express = require('express');
const productsRouter = express.Router();

productsRouter.get('/', (req, res, next) => {
    res.send('List of Products Here')
})

module.exports = productsRouter;
