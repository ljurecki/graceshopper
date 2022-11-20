const express = require('express');

// shopping cart
const productsRouter = require ("express").Router();
const productController = require('../controller');
const multerInstance = require('../../config/multer')
router.post("/", multerInstance.upload.single('image'), productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.removeProduct);

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
const {requireUser} = require(`./utils`);

const { ProductExistsError, ProductNotFoundError } = require(`../errors`);
// const { requireUser } = require(`./utils`);

// GET /api/products
productsRouter.get('/', async (req, res) => {
  const allProducts = await getAllProducts();
  // console.log(allproducts)
  res.send(allProducts);
});


// POST /api/products  
productsRouter.post('/', async (req, res) => {
  const { title, description, price, imageurl } = req.body;
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
productsRouter.patch('/:productId', requireUser, async (req, res, next) => {
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


module.exports = productsRouter;