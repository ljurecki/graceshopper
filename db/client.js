//DONT EDIT

const { Client } = require('pg');

const connectionString =
  process.env.DATABASE_URL || 'postgres://bestbooks_h06d_user:e3VPVUPfFZhCuh0M4PZpfbK0jkJ9HUSv@dpg-ce7u71p4reber9d2igl0-a/bestbooks_h06d';


const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;