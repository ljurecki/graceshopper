//getallproducts
//getProductsByPrice
//getProductsByGenre
//getProductsByAuthor
//createProducts (Admin only)

//const {client} = require("./client");
async function createProduct({ title, description }) {
    try {
        const { rows: [product] } = await client.query(`
      INSERT INTO products (title, price, author, description)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (title) DO NOTHING
      RETURNING *;
    `, [title, price, author, description])
        return product;
    }
    catch (ex) {
        console.log('error in createProduct adapter function')
    }
}
const { client } = require("./client");
async function createProduct({ name, description, price, imageURL }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products (name, description, price, "imageURL")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [name, description, price, imageURL]
    );
    return product;
  } catch (error) {
    throw error;
  }
}
async function getAllProducts() {
  try {
    const { rows: products } = await client.query(
      `
      SELECT *
      FROM products;
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
async function updateProduct(updateProduct) {
  try {
    const updateStr = Object.keys(updateData)
      .filter((key) => key !== "id")
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(", ");
    const {
      rows: [product],
    } = await client.query(
      `
      UPDATE products
      SET ${updateStr}
      WHERE id = $1
      RETURNING *;
      `,
      Object.values(updateData)
    );
    return product;
  } catch (error) {
    throw error;
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
  updateProduct,
  deleteProduct,
};
// module.exports = {
//     createProduct
// }