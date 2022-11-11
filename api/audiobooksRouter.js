const express = require('express');
const audioBooksRouter = express.Router();

const router = express.Router();
// These are all of the items listed in the project description that will need to be built out.
const {
  getAllAudioBooks,
  createAudioBook,
  getAudioBookByTitle,
  getAudioBookById,
  // getAudioBookByAuthor,
  // getAudioBookByGenre,
  // getAudioBookByPrice,
  updateAudioBook,
  // addAudioBookToCart,
  // audioBookAvailability,
} = require(`../db`);

const { ProductExistsError, ProductNotFoundError } = require(`../errors`);
const { requireUser } = require(`./utils`);

// GET /api/products
router.get('/', async (req, res) => {
  const allProducts = await getAllAudioBooks();

  res.send(allProducts);
});

// GET /api/products/productId
productsRouter.get('/', async (req, res, next) => {
  const { productId } = req.params;
  const _product = await getAudioBookById(audioBookId);

  if (!_audioBook) {
    res.send({
      error: 'AudioBookDoesNotExists',
      title: 'AudioBook does not exists',
      message: AudioBookNotFoundError(audioBookId),
    });
  } else {
    res.send('LIST OF AudioBooks')
  }
});

// POST /api/products
router.post('/', requireUser, async (req, res) => {
  const { title, description, price, imageURL } = req.body;
  const _title = await getAudioBookBytitle(title);
  const newProduct = await createAudioBook({ title, imageURL, description, price, author, genre });

  if (_title) {
    res.send({
      error: 'AudioBookAlreadyExists',
      title: 'AudioBook already exists',
      message: AudioBookExistsError(_title.title),
    });
  } else {
    res.send(newAudioBook);
  }
});

// PATCH /api/productId
router.patch('/:productId', requireUser, async (req, res, next) => {
  const { audioBookId } = req.params;

  try {
    const { title, imageURL, description, price, author, genre } = req.body;

    const updateFields = {};

    if (audioBookId) {
      updateFields.id = audioBookId;
    }

    if (title) {
      updateFields.title = title;
    }

    if (imageURL) {
      updateFields.imageURL = imageURL;
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


    const _product = await getAudioBookById(audioBookId);
    const _title = await getAudioBookByTitle(title);

    if (!_product) {
      res.send({
        error: 'Audio BookDoesNotExists',
        title: 'AudioBook does not exists',
        message: AudioBookNotFoundError(audioBookId),
      });
    } else if (_title) {
      res.send({
        error: 'AudioBookAlreadyExists',
        title: 'AudioBook already exists',
        message: AudioBookExistsError(_title.title),
      });
    } else {
      const allCanUpdateAudioBook = await updateAudioBook(updateFields);
      res.send(allCanUpdateAudioBook);
    }
  } catch ({ title, message }) {
    next({ title, message });
  }

});


module.exports = audioBooksRouter;
