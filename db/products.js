<<<<<<< HEAD
import {React, useState, useEffect} from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
//how to use bootstrap
import {
    Card,
    ListGroup,
    Row,
    Col,
    Button,
    Form,
    FloatingLabel,
    Alert,
  } from 'react-bootstrap';
const { client } = require("./client");
//import from api
import { 
    getAllProducts,
    createProduct,
    getProductByTitle,
    getProductByID,
    getProductByAuthor,
    getProductByGenre,
    getProductByPrice,
    updateProduct,
    addProductToCart,
    productAvailability,
} from '../api';

const { client } = require("./");
=======
const { client } = require("./client");
>>>>>>> 7c96a657b128434a6642a3bac13a7fa6c1a9a4e8

async function getAllProducts() {
  try {
    const { rows } = await client.query(
      `SELECT * 
      FROM products;`);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
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

async function getAllProductsByUser({ username }) {
  try {
    const {
      rows: products
    } = await client.query(`
        SELECT products.*, users.username AS "creatorName"
        FROM products
        JOIN users ON products."creatorId"=users.id
        WHERE users.username=$1;`,
      [username]
    );

    return products;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createProduct({ title, imageURL, description, price, author, genre }) {
  try {
    const {
      rows: [product]
    } = await client.query(`
      INSERT INTO products (title, "imageURL", description, price, author, genre)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (title) DO NOTHING
      RETURNING *;
    `, [title, imageURL, description, price, author, genre]
    );
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getProductByAuthor(author) {
  try {
    const {
      rows: [product],
    } = await client.query(`
        SELECT *
        FROM products
        WHERE author= $1;`,
      [author]
    );
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


async function getProductByGenre(genre) {
  try {
    const {
      rows: [product],
    } = await client.query(`
        SELECT *
        FROM products
        WHERE genre=$1;
        `,
      [genre]
    );
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getProductByPrice(price) {
  try {
    const {
      rows: [product],
    } = await client.query(`
        SELECT *
        FROM products
        WHERE price=$1;
        `,
      [price]
    );
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updateProduct({ id, ...fields }) {
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

async function deleteProduct(id) {
  try {
    const {
      rows: [product],
    } = await client.query(`
      SELECT * FROM products
      WHERE id=${id}`,
    )
    await client.query(`
      DELETE FROM products WHERE id=${id};`
    );
    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


module.exports = {
<<<<<<< HEAD
   getAllProducts,
=======
  getAllProducts,
>>>>>>> 7c96a657b128434a6642a3bac13a7fa6c1a9a4e8
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
