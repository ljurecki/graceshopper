const client = require("./client");

async function getAllCartProducts() {
  try {
    const { rows: products } = await client.query(`
      SELECT products.*, users.username AS "shopperName"
      FROM cart_products
      JOIN users ON cart_products."shopperId"=users.id;`);
    return products
  } catch (error) {
    console.error(error)
    throw error;
  }
}

async function getCartProductById(id) {
  try {
    const {
      rows: [cart_product],
    } = await client.query(
      `SELECT * FROM cart_products
        WHERE id=$1;`,
      [id]
    );
    return cart_product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createCartProduct({
  productId,
  qty,
  total }) {
  try {
    const {
      rows: [cart_product]
    } = await client.query(`
      INSERT INTO cart_products ("productId", qty, total)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [productId, qty, total]
    );
    return cart_product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function addProductToCart({
  cartId,
  productId,
  qty
}) {
  try {
    const {
      rows: [cart_product],
    } = await client.query(`
      INSERT INTO cart_product("cartId", "productId", qty)
      VALUES($1, $2, $3)
      RETURNING *;`,
      [cartId, productId, qty]
    );

    return cart_product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getCartProducstByUser({ id }) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM cart_products
      WHERE "cartId"=$1;`,
      [id]
    );

    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteCartProduct(id) {
  try {
    const {
      rows: [cart_product],
    } = await client.query(`
        DELETE FROM cart_products
        WHERE id=${id} 
        RETURNING *;`);

    return cart_product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getAllCartProducts,
  getCartProductById,
  createCartProduct,
  addProductToCart,
  getCartProducstByUser,
  deleteCartProduct
};