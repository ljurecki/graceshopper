require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./api');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(morgan("dev")); 
app.use(express.json());

app.use('./api', router);

// app.use('/files', express.static("files"));

const client = require('./db/client');
try {
    client.connect();
} catch (err) {
    console.error(err)
}


module.exports = app;

