
const client = require("./client");


async function createAudiobook({ title, description }) {
  try {
    const { rows: [audiobook] } = await client.query(`
      INSERT INTO audiobook (title, "imageURL", description, price, author, genre, )
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (title) DO NOTHING
      RETURNING *;
    `, [title, imageurl, description, price, author, genre])
    return audiobook;
  } catch (error) {
  throw error;
}
}

async function getAllAudiobooks() {
  try {
    const { rows: audiobook } = await client.query(
      `
      SELECT * 
      FROM audiobooks;
      `
    );
    return audiobook;
  } catch (error) {
    throw error;
  }
}
async function getAudiobookById(Id) {
  try {
    const {
      rows: [audiobook],
    } = await client.query(
      `
      SELECT *
      FROM audiobooks
      WHERE id = $1;
      `,
      [Id]
    );
    return audiobook;
  } catch (error) {
    throw error;
  }
}

async function updateAudiobook({ id, ...fields }) {
  try {
    const indexString = Object.keys(fields).map((key, index) => {
      return `"${key}"=$${index + 1}`;
    });
    const {
      rows: [audiobook],
    } = await client.query(`
      UPDATE audiobooks
      SET ${indexString}
      WHERE id=${id}
      RETURNING *;`,
      Object.values(fields)
    );
    return audiobook;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteAudiobook(Id) {
  try {
    const {
      rows: [audiobook],
    } = await client.query(
      `
      DELETE FROM audiobooks
      WHERE id = $1
      RETURNING *;
      `,
      [Id]
    );
    return audiobook;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createAudiobook,
  getAllAudiobooks,
  getAudiobookById,
  updateAudiobooks,
  deleteAudiobook,
  getAudiobookByTitle
};
