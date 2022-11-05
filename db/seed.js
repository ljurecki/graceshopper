const { client } = require('./')
const { createProduct } = require('./products')

async function dropTables() {
  try {
    console.log('Dropping Tables')
    // add code here
    await client.query(`
      DROP TABLE IF EXISTS products;
    `)

    console.log('Finished Dropping Tables')
  }
  catch (ex) {
    console.log('error dropping tables')
  }
}

async function createTables() {
  try {
    console.log('Creating Tables')
    // add code here
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT false
    );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" VARCHAR(255) NOT NULL,
        description VARCHAR(255) TEXT NOT NULL,
        price TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL
      );
      CREATE TABLE audiobooks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) TEXT NOT NULL,
        price TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL
      );
    `)

    console.log('Finished Creating Tables')
  }
  catch (ex) {
    console.log('error creating tables')
  }
}


async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      { username: 'david', password: 'david123', isAdmin: true },
      { username: 'mandy', password: 'mandy123', isAdmin: true },
      { username: 'tyler', password: 'tyler123', isAdmin: true },
      { username: 'libette', password: 'libette123', isAdmin: true },
      { username: 'adam', password: 'adam123', isAdmin: true },
      { username: 'shaun', password: 'shaun123', },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log('Creating Products')
    await createProduct({
      imageUrl:
      " ",
      title:
        "The first most amazing product",
      description:
        "Description for the first most amazing product ever...."
    });

    await createProduct({
      title:
        "The second most amazing product",
      description:
        "Description for the second most amazing product ever...."
    });

    await createProduct({
      title:
        "The third most amazing product",
      description:
        "Description for the third most amazing product ever...."
    });

    console.log('Finished creating Products')
  }
  catch (ex) {
    console.log('error creating Products')
  }
}

async function buildDB() {
  try {
    // need to add something here
    client.connect();
    await dropTables();
    await createTables();
    await createInitialProducts();
    await createInitialUsers();
  }
  catch (ex) {
    console.log('Error building the DB')
  }
}


buildDB()
  .catch(console.error)
  .finally(() => client.end())