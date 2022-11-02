const { client } = require('./');

async function createProduct({ title, description }) {
    try {
        const { rows: [product] } = await client.query(`
      INSERT INTO products (title, price, author, description, category)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (title) DO NOTHING
      RETURNING *;
    `, [title, price, author, description, category])

        return product;
    }
    catch (ex) {
        console.log('error in creatPruduct adapter function')
    }
}


module.exports = {
    createProduct
}