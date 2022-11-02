require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const server = express();
const router = require('./api');
const cors = require('cors');

const PORT = 3001;

server.use(morgan('dev')); 
server.use(express.json());
server.use(cors());

server.use('/api', router);

server.listen(PORT, () => {
    Cconsole.log(`server is up and running on port ${PORT}`)
})

server.use((req, res, next)=> {
    console.log('Hitting Server')
    next();
})


module.exports = server;