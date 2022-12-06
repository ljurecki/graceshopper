const client = require("./client");


async function getCart(userId) { //tested working
  try {
    const { rows: product } = await client.query(`
       SELECT *
       FROM cart_products
       WHERE "cartId"=$1;`, [userId]
      );

    return product
  } catch (error) {
    console.error(error)
    throw error;
  }
}
// SELECT cart_products.*, users.username AS "shopperName"
// FROM cart_products
// WHERE "cartId"=$1
// JOIN users ON cart_products."cartId"=users.id

async function createCartProduct({ //tested working
  productId,
  qty
}) {
  try {
    const {
      rows: [cart_product]
    } = await client.query(`
      INSERT INTO cart_products ("productId", qty)
      VALUES ($1, $2)
      RETURNING *;
    `, [productId, qty]
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



async function destroyCartProduct(userId, id) {
  try {
    const {
      rows: [cart_product],
    } = await client.query(`
      DELETE FROM cart_products
      WHERE "productId"=${id}
      and "cartId"=${userId}
      RETURNING *;`);
    return cart_product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


async function updateCartProduct(userId, { id, ...fields }) { 

  try {
    const indexString = Object.keys(fields).map((key, index) => {
      return `"${key}"=$${index + 1}`;
    });
    const {
      rows: [cart_product],
    } = await client.query(`
      UPDATE cart_products
      SET ${indexString}
      WHERE "productId"=${id} 
      and "cartId"=${userId}
      RETURNING *;`,
      Object.values(fields)
    );
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
  destroyCartProduct,
  updateCartProduct
};