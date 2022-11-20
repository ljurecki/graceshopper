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


<<<<<<< HEAD:Src/index.js

require("./config/mongoose.js")(App);
require('./app/routeHandler')(App)
=======
// // require("./config/mongoose.js")(app);
// // require('./app/routeHandler')(app)
>>>>>>> 980eff678086778cbfda1a8fbf1da9a11c2f15fb:src/index.js
// // const bodyParser = require('body-parser');


// app.use(bodyParser.json())
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Arise MERN Developers'
//     });
// });
