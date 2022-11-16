
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


  

async function getProductByTitle(Title) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
        [Title]
      );
      return product;
    } catch (error) {
      throw error;
    }
  }


async function getProductById(Id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT *
      FROM products
      WHERE id = $1;
      `,
      [Id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductByAuthor(Author) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
        [Author]
      );
      return product;
    } catch (error) {
      throw error;
    }
  }


  async function getProductByGenre(Genre) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
        [Genre]
      );
      return product;
    } catch (error) {
      throw error;
    }
  }

  async function getProductByPrice(Price) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
        [Price]
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

async function deleteProduct(Id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      DELETE FROM products
      WHERE id = $1
      RETURNING *;
      `,
      [Id]
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
  addProductToCart,
  productAvailability,
  deleteProduct
};
