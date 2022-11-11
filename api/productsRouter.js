const express = require('express');
const router = express.Router();
// These are all of the items listed in the project description that will need to be built out.
const {
  getAllProducts,
  createProduct,
  getProductByTitle,
  getProductById,
  updateProduct,
  // addProductToCart,
  // productAvailability,
} = require(`../db`);

const { ProductExistsError, ProductNotFoundError } = require(`../errors`);
const { requireUser } = require(`./utils`);

// GET /api/products
router.get('/', async (req, res) => {
  const allProducts = await getAllProducts();

  res.send(allProducts);
});

// GET /api/products/productId
router.get('/', async (req, res, next) => {
  const { productId } = req.params;
  const _product = await getProductById(productId);

  if (!_product) {
    res.send({
      error: 'ProductDoesNotExists',
      title: 'Product does not exists',
      message: ProductNotFoundError(productId),
    });
  } else {
    res.send('LIST OF PRODUCTS')
  }
});

// POST /api/products  
router.post('/', requireUser, async (req, res) => {
  const { title, description, price, imageURL } = req.body;
  const _title = await getProductByTitle(title);
  const newProduct = await createProduct({ title, imageURL, description, price, author, genre });

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
router.patch('/:productId', requireUser, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const { title, imageURL, description, price, author, genre } = req.body;

    const updateFields = {};

    if (productId) {
      updateFields.id = productId;
    }

    if (imageURL) {
      updateFields.imageURL = imageURL;
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


module.exports = router;