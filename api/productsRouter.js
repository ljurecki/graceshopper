const express = require('express');
const productsRouter = express.Router();
// These are all of the items listed in the project description that will need to be built out.
const {
  getAllProducts,
  createProduct,
  getProductByTitle,
  getProductById,
  updateProduct,
} = require(`../db`);
const {requireUser} = require(`./utils`);

const { ProductExistsError, ProductNotFoundError } = require(`../errors`);

// GET /api/products
productsRouter.get('/', async (req, res, next) => { //tested working
  try {
    const products = await getAllProducts();
    if(products){
      res.send(products);
    }    

  } catch ({ title, message }) {
      next({ title, message });
  }
});


// POST /api/products   
productsRouter.post('/', requireUser, async (req, res) => { //tested working
  const { title, imageurl, description, price, author, genre } = req.body;
  const _title = await getProductByTitle(title);
  const newProduct = await createProduct({ title, imageurl, description, price, author, genre });

  if (_title) {
    res.send({
      error: 'ProductAlreadyExists',
      title: 'Product already exists',
      message: ProductExistsError(_title.title),
    });
  } else {
    res.send(newProduct);
  }
});

// PATCH /api/productId
productsRouter.patch('/:productId', requireUser, async (req, res, next) => { //tested working
  const { productId } = req.params;

  try {
    const { title, imageurl, description, price, author, genre } = req.body;

    const updateFields = {};

    if (productId) {
      updateFields.id = productId;
    }

    if (imageurl) {
      updateFields.imageurl = imageurl;
    }

    if (title) {
      updateFields.title = title;
    }

    if (description) {
      updateFields.description = description;
    }

    if (price) {
      updateFields.price = price;
    }

    if (author) {
      updateFields.author = author;
    }

    if (genre) {
      updateFields.genre = genre;
    }

    const _product = await getProductById(productId);
    const _title = await getProductByTitle(title);

    if (!_product) {
      res.send({
        error: 'ProductDoesNotExists',
        title: 'Product does not exists',
        message: ProductNotFoundError(productId),
      });
    } else if (_title) {
      res.send({
        error: 'ProductAlreadyExists',
        title: 'Product already exists',
        message: ProductExistsError(_title.title),
      });
    } else {
      const adminUpdateProduct = await updateProduct(updateFields);
      res.send(adminUpdateProduct);
    }
  } catch ({ title, message }) {
    next({ title, message });
  }

});

productsRouter.delete('/:productId', requireUser, async (req, res, next) => {
  const { productId } = req.params;
  try {
    const _product = await getProductById(productId);

    if (!_product.id) {
      res.status(403).send({
        error: 'UserCannotDeleteRoutine',
        name: 'User cannot delete routine',
        message: UnauthorizedDeleteError(req.user.isAdmin, _product.title),
      });
    } else {
      const removeProduct = await deleteProduct(_product.id);
      res.send(removeProduct);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});



module.exports = productsRouter;