import React, { useState, useEffect} from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
//use bootstrap
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

  async function createProduct() {
    const newActivity = {
      name,
      description,
      title,
      genre,
      price
    };
    const result = await createProduct(jwt, user, newActivity);
    if (result.error) {
      console.error(result.error);
      setErrorMessage(result.error);
    } else {
      setSuccessMessage('Product Created!');
      setErrorMessage('');
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }

async function getProductByTitle(productTitle) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
        [productTitle]
      );
      return product;
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

async function getProductByAuthor(productAuthor) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
        [productAuthor]
      );
      return product;
    } catch (error) {
      throw error;
    }
  }


  async function getProductByGenre(productGenre) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
        [productGenre]
      );
      return product;
    } catch (error) {
      throw error;
    }
  }

  async function getProductByPrice(productPrice) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
        [productPrice]
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
// module.exports = {
//     createProduct
// }