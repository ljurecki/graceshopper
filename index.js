require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const router = require('./api');
const PORT = 3001;

app.use(morgan("dev")); 
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use('/files', express.static("files"));

app.use((req, res, next)=> {
    console.log('Hitting Server')
    next();
})

app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
})

module.exports = app;