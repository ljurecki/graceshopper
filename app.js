require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./api');
const cors = require('cors');

app.use(cors());
app.use(morgan("dev")); 
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3001;

const client = require('./db/client');
client.connect();


app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
})