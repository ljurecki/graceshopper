import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
const express = require('express');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);



require("./config/mongoose.js")(App);
require('./app/routeHandler')(App)
// // const bodyParser = require('body-parser');


// app.use(bodyParser.json())
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Arise MERN Developers'
//     });
// });
