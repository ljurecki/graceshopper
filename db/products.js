const client = require("./client");

async function getAllProducts() { //tested working
  try {
    const { rows } = await client.query(
      `SELECT * 
      FROM products;`);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) { //tested working
  try {
    const { rows: [product]
    } = await client.query(`
      SELECT *
      FROM products
      WHERE id=$1;`,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductByTitle(title) {
  try {
    const {
      rows: [product]
    } = await client.query(
      ` SELECT *
        FROM products
        WHERE title=$1;`,
      [title]
    );
    return product;
  } catch (error) {
    throw error;
  }
}


async function createProduct({ title, imageurl, description, price, author, genre }) { //tested working
  try {
    const {
      rows: [product]
    } = await client.query(`
      INSERT INTO products (title, imageurl, description, price, author, genre)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (title) DO NOTHING
      RETURNING *;
    `, [title, imageurl, description, price, author, genre]
    );
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


async function updateProduct({ id, ...fields }) { //tested working
  try {
    const indexString = Object.keys(fields).map((key, index) => {
      return `"${key}"=$${index + 1}`;
    });
    const {
      rows: [product],
    } = await client.query(`
      UPDATE products
      SET ${indexString}
      WHERE id=${id}
      RETURNING *;`,
      Object.values(fields)
    );
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteProduct(id) { //Needs testing
  try {
    const {
      rows: [product],
    } = await client.query(`
      SELECT * FROM products
      WHERE id=${id}`,
    )
    await client.query(
      `DELETE FROM products 
      WHERE id=${id};`
    );
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


module.exports = {
  getAllProducts,
  createProduct,
  getProductByTitle,
  getProductById,
  updateProduct,
  deleteProduct
};