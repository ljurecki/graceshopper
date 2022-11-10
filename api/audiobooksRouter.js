const express = require('express');
const audiobooksRouter = express.Router();

const router = express.Router();

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

// GET /api/audiobooks/audiobookId
audiobooksRouter.get('/', async (req, res, next) => {
  const { audiobookId } = req.params;
  const _audiobook = await getAudiobookById(productId);

  if (!_product) {
    res.send({
      error: 'ProductDoesNotExists',
      title: 'Product does not exists',
      message: AudiobookNotFoundError(audiobookId),
    });
  } else {
    res.send('LIST OF AudioBooks')
  }
});

// POST /api/audiobook
router.audiobook('/', requireUser, async (req, res) => {
  const { title, description, price } = req.body;
  const _title = await getAudiobookByTitle(title);
  const newProduct = await createAudiobook({ title, description, price, author, genre });

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
    const { title, description, price, author, genre } = req.body;

    const updateFields = {};

    if (audioBookId) {
      updateFields.id = audioBookId;
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
