// ! Initialize the dotenv process.
require('dotenv').config();

// ! All the imports.
// Import Express
const express = require('express');

// Import Cors
const cors = require('cors');

// Import Mongoose Config File
require('./config/mongoose.config');

// Import cookieParser
const cookieParser = require('cookie-parser');


// ! Initialize the express app
const app = express();

// ! App Config
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// ! Import and run all the routes
require("./routes/user.route")(app);
require("./routes/store.route")(app);

// ! Get port from .env
const port = process.env.PORT;

// ! Run the Server
app.listen(port, () => console.log(`Server Running On Port ${port} ♻`));

