const express = require('express');
const productsRouter = express.Router();

const router = express.Router();
// These are all of the items listed in the project description that will need to be built out.
const {
  getAllProducts,
  createProduct,
  getProductByName,
  getProductById,
  getProductByAuthor,
  getProductByGenre,
  getProductByPrice,
  updateProduct,
  viewSingleProduct,
  addProductToCart,
  deleteProduct,
  productAvailability,
} = require(`../db`);

// Do we have these available somewhere for access?
const { ProductExistsError, ProductNotFoundError } = require(`../errors`);
const {requireUser} = require(`./utils`);

// GET /api/products
router.get('/', async (req, res) => {
  const allProducts = await getAllProducts();

  res.send(allProducts);
});

// GET /api/products/productId
productsRouter.get('/', async (req, res, next) => {
  const { productId } = req.params;
  const _product = await getProductById(productId);
  
  if (!_product) {
    res.send({
      error: 'ProductDoesNotExists',
      name: 'Product does not exists',
      message: ProductNotFoundError(productId),
    });
  } else {
    res.send('LIST OF PRODUCTS')
  } 
});

// POST /api/products
// Do we need to include products after the slash?
router.post('/', requireUser, async (req, res) => {
  const { name, description, price, image } = req.body;
  const _name = await getProductByName(name);
  const newProduct = await createProduct({ name, description, price, image });

  if (_name) {
    res.send({
      error: 'ProductAlreadyExists',
      name: 'Product already exists',
      message: ProductExistsError(_name.name),
    });
  } else {
    res.send(newProduct);
  }
});

// PATCH /api/products
router.patch('/products', requireUser, async (req, res, next) => {
  const { productId } = req.params;
 
 try {
  const { name, description, price, image } = req.body;

  const updateFields = {};

  if (productId) {
    updateFields.id = productId;
  }

  if (name) {
    updateFields.name = name;
  }

  if (description) {
    updateFields.description = description;
  }

  if (price) {
    updateFields.price = price;
  }

  if (image) {
    updateFields.image = image;
  }

  const _product = await getProductById(productId);
  const _name = await getProductByName(name);

  if (!_product) {
    res.send({
      error: 'ProductDoesNotExists',
      name: 'Product does not exists',
      message: ProductNotFoundError(productId),
    });
  } else if (_name) {
    res.send({
      error: 'ProductAlreadyExists',
      name: 'Product already exists',
      message: ProductExistsError(_name.name),
    });
  } else {
    const allCanUpdateProduct = await updateProduct(updateFields);
    res.send(allCanUpdateProduct);
  }
} catch ({ name, message }) {
  next({ name, message });
}

});


module.exports = productsRouter;

