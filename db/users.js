const { client } = require('./');

async function createUser({ username, password }) {
    const hashedPassword = await bcrypt.hash(password);
  
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;`,
        [username, hashedPassword]
      );
  
      delete user.password;
      return user;
    } catch (err) {
      console.error(err);
      throw err; 
    }
  }

  async function getUser({ username, password }) {
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


  async function getUserById(userId) {
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

  async function getUserByUsername(userName) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
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
  