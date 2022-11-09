const { Client } = require('pg');


const connectionString =
  process.env.DATABASE_URL || 'postgress://localhost:5432/graceshopper';

const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;




// const { DATABASE_URL } = process.env;

// const client = new Client({
//     connectionString: DATABASE_URL

// });

// module.exports = {
//     client
// };