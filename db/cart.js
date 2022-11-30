const client = require("./client");


async function getCart() { //tested working
  try {
    const { rows: product } = await client.query(`
      SELECT cart_products.*, users.username AS "shopperName"
      FROM cart_products
      JOIN users ON cart_products."cartId"=users.id;`
    );

    console.log(product)
    return product
  } catch (error) {
    console.error(error)
    throw error;
  }
}


async function createCartProduct({ //tested working
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

async function addProductToCart({ //tested working
  cartId,
  productId,
  qty
}) {

  try {
    const {
      rows: [cart_product],
    } = await client.query(`
      INSERT INTO cart_products("cartId", "productId", qty)
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


async function getCartProductById(id) { //tested working
  try {
    const {
      rows: [cart_product],
    } = await client.query(
      `SELECT * FROM cart_products
              WHERE id=$1`,
      [id]
    );
    return cart_product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updateCartProduct(cartId, qty) { 
  try {
    const {
      rows: [qty],
    } = await client.query(`
        UPDATE cart_products(qty)
        WHERE id=${id} 
        RETURNING *;`
        [qty]);

    return cart_product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteCartProduct(id) { //tested working
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
  getCart,
  getCartProductById,
  createCartProduct,
  addProductToCart,
  updateCartProduct,
  deleteCartProduct
};