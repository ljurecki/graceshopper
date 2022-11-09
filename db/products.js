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
      `SELECT * FROM products;`);
    return products;
  } catch (error) {
    throw error;
  }
}


async function getProductByTitle(title) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
      [title]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProductsByUser({ username }) {
  try {
    const { rows: products } = await client.query(
      `
        SELECT products.*, users.username AS "creatorName"
        FROM products
        JOIN users ON products."creatorId"=users.id
        WHERE users.username=$1;`,
      [username]
    );

    const result = await attachActivitiesToRoutines(products);

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT *
      FROM products
      WHERE id = $1;
      `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductByAuthor(author) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
      [author]
    );
    return product;
  } catch (error) {
    throw error;
  }
}


async function getProductByGenre(genre) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
      [genre]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductByPrice(price) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
      [price]
    );
    return product;
  } catch (error) {
    throw error;
  }
}


async function updateProduct({ id, ...fields }) {
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

async function deleteProduct(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      DELETE FROM products
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductByTitle,
  getProductById,
  getProductByAuthor,
  getProductByGenre,
  getProductByPrice,
  updateProduct,
  getAllProductsByUser,
  // addProductToCart,
  // productAvailability,
  deleteProduct
};
