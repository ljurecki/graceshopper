require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./api');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(morgan("dev")); 
app.use(express.json());

app.use('/api', router);

// app.use('/files', express.static("files"));

const client = require('./db/client');
client.connect();


module.exports = app;

// app.use((req, res, next)=> {
//     console.log('Hitting Server')
//     next();
// })

// app.listen(PORT, () => {
//     console.log(`server is up and running on port ${PORT}`)
// })