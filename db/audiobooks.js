
const { client } = require("./client");

async function audioBook({ title, description }) {
  try {
    const { rows: [audioBook] } = await client.query(`
      INSERT INTO audioBook (title, "imageURL", description, price, author, genre, )
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (title) DO NOTHING
      RETURNING *;
    `, [title, imageURL, description, price, author, genre])
    return product;
  } catch (error) {
  throw error;
}
}

async function getAllAudioBooks() {
  try {
    const { rows: audioBooks } = await client.query(
      `
      SELECT * FROM audioBooks;
      `
    );
    return products;
  } catch (error) {
    throw error;
  }
}
async function getAudioBookById(audioBookId) {
  try {
    const {
      rows: [audioBook],
    } = await client.query(
      `
      SELECT *
      FROM audioBooks
      WHERE id = $1;
      `,
      [audioBookId]
    );
    return product;
  } catch (error) {
    throw error;
  }
}
async function updateAudioBooks({ id, ...fields }) {
  try {
    const indexString = Object.keys(fields).map((key, index) => {
      return `"${key}"=$${index + 1}`;
    });
    const {
      rows: [audioBooks],
    } = await client.query(
      `
      UPDATE audioBooks
      SET ${indexString}
      WHERE id=${id}
      RETURNING *;`,
      Object.values(fields)
    );
    return audioBooks;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteAudioBook(audioBookId) {
  try {
    const {
      rows: [audioBook],
    } = await client.query(
      `
      DELETE FROM audioBooks
      WHERE id = $1
      RETURNING *;
      `,
      [audioBookId]
    );
    return audioBook;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createAudioBook,
  getAllAudioBooks,
  getAudioBookById,
  updateAudioBooks,
  deleteAudioBook,
};
// module.exports = {
//     createProduct
// }