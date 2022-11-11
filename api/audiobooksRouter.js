const express = require('express');
const audioBooksRouter = express.Router();

const router = express.Router();
// These are all of the items listed in the project description that will need to be built out.
const {
  getAllAudiobooks,
  createAudiobook,
  getAudiobookByTitle,
  getAudiobookById,
  // getAudioBookByAuthor,
  // getAudioBookByGenre,
  // getAudioBookByPrice,
  updateAudiobook,
  // addAudioBookToCart,
  // audioBookAvailability,
} = require(`../db`);

const { AudiobookExistsError, AudiobookNotFoundError } = require(`../errors`);
const { requireUser } = require(`./utils`);

// GET /api/products
audiobooksRouter.get('/', async (req, res) => {
  const allProducts = await getAllAudiobooks();

  res.send(allProducts);
});

// GET /api/products/productId
productsRouter.get('/', async (req, res, next) => {
  const { productId } = req.params;
  const _product = await getAudioBookById(audioBookId);
audiobooksRouter.get('/', async (req, res, next) => {
  const { audiobookId } = req.params;
  const _audiobook = await getAudiobookById(audiobookId);

  if (!_audiobook) {
    res.send({
      error: 'AudioBookDoesNotExists',
      title: 'AudioBook does not exists',
      message: AudiobookNotFoundError(audiobookId),
    });
  } else {
    res.send('LIST OF Audiobooks')
  }
});

// POST /api/products
router.post('/', requireUser, async (req, res) => {
  const { title, description, price, imageURL } = req.body;
  const _title = await getAudioBookBytitle(title);
  const newProduct = await createAudioBook({ title, imageURL, description, price, author, genre });
// POST /api/audiobook
audiobooksRouter.post('/', requireUser, async (req, res) => {
  const { title, description, price, imageURL } = req.body;
  const _title = await getAudiobookBytitle(title);
  const newAudiobook = await createAudiobook({ title, imageURL, description, price, author, genre });

  if (_title) {
    res.send({
      error: 'AudioBookAlreadyExists',
      title: 'AudioBook already exists',
      message: AudioBookExistsError(_title.title),
    });
  } else {
    res.send(newAudiobook);
  }
});

// PATCH /api/productId
router.patch('/:productId', requireUser, async (req, res, next) => {
  const { audioBookId } = req.params;
audiobooksRouter.patch('/:audiobookId', requireUser, async (req, res, next) => {
  const { audiobookId } = req.params;

  try {
    const { title, imageURL, description, price, author, genre } = req.body;

    const updateFields = {};

    if (audioBookId) {
      updateFields.id = audioBookId;
    if (audiobookId) {
      updateFields.id = audiobookId;
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
    const _product = await getAudiobookById(audiobookId);
    const _title = await getAudiobookByTitle(title);

    if (!_product) {
      res.send({
        error: 'Audio BookDoesNotExists',
        title: 'AudioBook does not exists',
        message: AudiobookNotFoundError(audiobookId),
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
        message: AudiobookExistsError(_title.title),
      });
    } else {
      const allCanUpdateAudiobook = await updateAudiobook(updateFields);
      res.send(allCanUpdateAudiobook);
    }
  } catch ({ title, message }) {
    next({ title, message });
  }

});


module.exports = audioBooksRouter;
module.exports = audiobooksRouter;
