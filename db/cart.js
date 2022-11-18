const client = require("./client");

async function getCartProductById(id) {
    try {
      const {
        rows: [cart_product],
      } = await client.query(
        `
        SELECT * FROM cart_product
        WHERE id=$1;`,
        [id]
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
    total,
    cost,
  }) {
    try {
      const {
        rows: [cart_product],
      } = await client.query(
        `
          INSERT INTO cart_product("cartId", "productId", total, cost)
          VALUES($1, $2, $3, $4)
          RETURNING *;`,
        [cartId,
            productId,
            total,
            cost,]
      );
  
      return cart_products;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function getCartProducstByCart({ id }) {
    try {
      const { rows } = await client.query(
        `
        SELECT * FROM cart_products
        WHERE "routineId"=$1;`,
        [id]
      );
  
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function destroyCartProduct(id) {
    try {
      const {
        rows: [cart_product],
      } = await client.query(`
        DELETE FROM cart_products WHERE id=${id} RETURNING *;`);
      return cart_product;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  module.exports = {
    getCartProductById,
    addProductToCart,
    getCartProducstByCart,
    destroyCartProduct
    
  };