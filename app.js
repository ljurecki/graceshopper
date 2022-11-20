require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./api');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(morgan("dev")); 
app.use(express.json());
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({
        message: 'Arise MERN Developers'
    });
});

app.use('/api', router);

const PORT = process.env.PORT || 3001;

app.use('./images', express.static("images"));

const client = require('./db/client');
client.connect();

app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
});


