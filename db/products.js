const { client } = require("./client");

async function createProduct({ title, description }) {
  try {
    const { rows: [product] } = await client.query(`
      INSERT INTO products (title, "imageURL", description, price, author, genre,)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (title) DO NOTHING
      RETURNING *;
    `, [title, imageURL, description, price, author, genre])
    return product;
  } catch (error) {
  throw error;
}
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(
      `
      SELECT * FROM products;
      `
    );
    return products;
  } catch (error) {
    throw error;
  }
}
async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT *
      FROM products
      WHERE id = $1;
      `,
      [productId]
    );
    return product;
  } catch (error) {
    throw error;
  }
}
async function updateProducts({ id, ...fields }) {
  try {
    const indexString = Object.keys(fields).map((key, index) => {
      return `"${key}"=$${index + 1}`;
    });
    const {
      rows: [products],
    } = await client.query(
      `
      UPDATE products
      SET ${indexString}
      WHERE id=${id}
      RETURNING *;`,
      Object.values(fields)
    );
    return products;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteProduct(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      DELETE FROM products
      WHERE id = $1
      RETURNING *;
      `,
      [productId]
    );
    return product;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProducts,
  deleteProduct,
};
