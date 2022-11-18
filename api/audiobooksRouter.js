const express = require('express');
const audiobooksRouter = express.Router();

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


// POST /api/audiobook
audiobooksRouter.post('/', async (req, res) => {
  const { title, description, price, imageurl } = req.body;
  const _title = await getAudiobookBytitle(title);
  const newAudiobook = await createAudiobook({ title, imageurl, description, price, author, genre });

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
audiobooksRouter.patch('/:audiobookId', requireUser, async (req, res, next) => {
  const { audiobookId } = req.params;

  try {
    const { title, imageurl, description, price, author, genre } = req.body;

    const updateFields = {};

    if (audiobookId) {
      updateFields.id = audiobookId;
    }

 if (imageurl) {
      updateFields.imageurl = imageuel;
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


    const _audiobook = await getAudiobookById(audiobookId);
    const _title = await getAudiobookByTitle(title);

    if (!_audiobook) {
      res.send({
        error: 'Audio BookDoesNotExists',
        title: 'AudioBook does not exists',
        message: AudiobookNotFoundError(audiobookId),
      });
    } else if (_title) {
      res.send({
        error: 'AudioBookAlreadyExists',
        title: 'AudioBook already exists',
        message: AudiobookExistsError(_title.title),
      });
    } else {
      const adminUpdateAudiobook = await updateAudiobook(updateFields);
      res.send(adminUpdateAudiobook);
    }
  } catch ({ title, message }) {
    next({ title, message });
  }
});


module.exports = audiobooksRouter;
