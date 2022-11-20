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

<<<<<<< HEAD
app.use('./images', express.static("images"));

=======
>>>>>>> 980eff678086778cbfda1a8fbf1da9a11c2f15fb
const client = require('./db/client');
client.connect();

// app.use('/files', express.static("files"));

app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
});

