const express = require('express');
const audiobooksRouter = express.Router();

const router = express.Router();
const {
  getAllAudiobooks,
  createAudiobook,
  getAudiobookByTitle,
  getAudiobookById,
  updateAudiobook,
} = require(`../db`);

const { AudiobookExistsError, AudiobookNotFoundError } = require(`../errors`);
const { requireUser } = require(`./utils`);

// GET /api/audiobooks
router.get('/', async (req, res) => {
  const allAudiobooks = await getAllAudiobooks();

  res.send(allAudiobooks);
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
    res.send('LIST OF AUDIOBOOKS')
  }
});

// POST /api/audiobook
router.audiobook('/', requireUser, async (req, res) => {
  const { title, description, price } = req.body;
  const _title = await getAudiobookByTitle(title);
  const newProduct = await createAudiobook({ title, description, price, author, genre });

  if (_title) {
    res.send({
      error: 'AudiobookAlreadyExists',
      title: 'Audiobook already exists',
      message: AudiobookExistsError(_title.title),
    });
  } else {
    res.send(newAudiobook);
  }
});

// PATCH /api/audiobookId
router.patch('/:audiobookId', requireUser, async (req, res, next) => {
  const { audiobookId } = req.params;

  try {
    const { title, description, price, author, genre } = req.body;

//     if (audiobookId) {
//       updateFields.id = audiobookId;
//     }

    if (audiobookId) {
      updateFields.id = audiobookId;
    }

//     if (imageURL) {
//       updateFields.imageURL = imageURL;
//     }

    if (description) {
      updateFields.description = description;
    }

//     if (price) {
//       updateFields.price = price;
//     }

    if (author) {
      updateFields.author = author;
    }

//     if (genre) {
//       updateFields.genre = genre;
//     }

    const _audiobook = await getAudiobookById(audiobookId);
    const _title = await getAudiobookByTitle(title);

    if (!_audiobook) {
      res.send({
        error: 'AudiobookDoesNotExists',
        title: 'Audiobook does not exists',
        message: AudiobookNotFoundError(audiobookId),
      });
    } else if (_title) {
      res.send({
        error: 'AudiobookAlreadyExists',
        title: 'Audiobook already exists',
        message: AudiobookExistsError(_title.title),
      });
    } else {
      const allCanUpdateAudiobook = await updateAudiobook(updateFields);
      res.send(allCanUpdateAudiobook);
    }
  } catch ({ title, message }) {
    next({ title, message });
  }

// });


module.exports = audiobooksRouter;