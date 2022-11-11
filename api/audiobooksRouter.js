const express = require('express');
<<<<<<< HEAD
const audioBooksRouter = express.Router();

const router = express.Router();
=======
const router = express.Router();

>>>>>>> cae6f7862ee6872ec651771822209047e9093c38
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
<<<<<<< HEAD
productsRouter.get('/', async (req, res, next) => {
  const { productId } = req.params;
  const _product = await getAudioBookById(audioBookId);
=======
Router.get('/', async (req, res, next) => {
  const { audiobookId } = req.params;
  const _audiobook = await getAudioBookById(audioBookId);
>>>>>>> cae6f7862ee6872ec651771822209047e9093c38

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

<<<<<<< HEAD
// POST /api/products
router.post('/', requireUser, async (req, res) => {
  const { title, description, price, imageURL } = req.body;
  const _title = await getAudioBookBytitle(title);
  const newProduct = await createAudioBook({ title, imageURL, description, price, author, genre });
=======
// POST /api/audiobook
router.post('/', requireUser, async (req, res) => {
  const { title, description, price, imageURL } = req.body;
  const _title = await getAudioBookBytitle(title);
  const newAudiobook = await createAudioBook({ title, imageURL, description, price, author, genre });
>>>>>>> cae6f7862ee6872ec651771822209047e9093c38

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
<<<<<<< HEAD
router.patch('/:productId', requireUser, async (req, res, next) => {
  const { audioBookId } = req.params;
=======
router.patch('/:audiobookId', requireUser, async (req, res, next) => {
  const { audiobookId } = req.params;
>>>>>>> cae6f7862ee6872ec651771822209047e9093c38

  try {
    const { title, imageURL, description, price, author, genre } = req.body;

    const updateFields = {};

    if (audioBookId) {
<<<<<<< HEAD
      updateFields.id = audioBookId;
=======
      updateFields.id = audiobookId;
>>>>>>> cae6f7862ee6872ec651771822209047e9093c38
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


<<<<<<< HEAD
    const _product = await getAudioBookById(audioBookId);
    const _title = await getAudioBookByTitle(title);
=======
    const _product = await getAudiobookById(audioBookId);
    const _title = await getAudiobookByTitle(title);
>>>>>>> cae6f7862ee6872ec651771822209047e9093c38

    if (!_product) {
      res.send({
        error: 'Audio BookDoesNotExists',
        title: 'AudioBook does not exists',
        message: AudioBookNotFoundError(audioBookId),
      });
    } else if (_title) {
      res.send({
<<<<<<< HEAD
        error: 'AudioBookAlreadyExists',
        title: 'AudioBook already exists',
        message: AudioBookExistsError(_title.title),
      });
    } else {
      const allCanUpdateAudioBook = await updateAudioBook(updateFields);
      res.send(allCanUpdateAudioBook);
=======
        error: 'AudiobookAlreadyExists',
        title: 'Audiobook already exists',
        message: AudiobookExistsError(_title.title),
      });
    } else {
      const allCanUpdateAudiobook = await updateAudiobook(updateFields);
      res.send(allCanUpdateAudiobook);
>>>>>>> cae6f7862ee6872ec651771822209047e9093c38
    }
  } catch ({ title, message }) {
    next({ title, message });
  }

});


<<<<<<< HEAD
module.exports = audioBooksRouter;
=======
module.exports = audiobooksRouter;
>>>>>>> cae6f7862ee6872ec651771822209047e9093c38
