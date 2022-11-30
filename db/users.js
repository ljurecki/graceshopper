const client = require('./client');
const bcrypt = require('bcrypt');

async function createUser({ username, password, isAdmin}) { //tested working
  const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
      const {
        rows: [user],
      } = await client.query(`
        INSERT INTO users(username, password, "isAdmin")
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;`,
        [username, hashedPassword, isAdmin]
      );
  
      delete user.password;
      return user;
    } catch (err) {
      console.error(err);
      throw err; 
    }
  }

  async function getUser({ username, password }) { //tested working
    try {
      const user = await getUserByUsername(username);
      const hashedPassword = user.password;
      const isValid = await bcrypt.compare(password, hashedPassword);
      if (isValid) {
        delete user.password;
        return user;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


  async function getUserById(userId) { //tested working
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT * FROM users
        WHERE id=$1;`,
        [userId]
      );
      if (user) {
        delete user.password;
        return user;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function getUserByUsername(userName) { //tested working
    try {
      const {
        rows: [user],
      } = await client.query(`
        SELECT * FROM users
        WHERE username=$1;`,
        [userName]
      );
      if (user) {
        return user;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  
  module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
  };