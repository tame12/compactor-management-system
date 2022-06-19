// app.js
const express = require('express');
const path = require("path")
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '..', '.env')});
const connectDB = require('./config/db');
const cors = require('cors');
const port = process.env.PORT || 8082;


// routes
const equipment = require('./routes/api/equipment');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/equipment', equipment);


app.listen(port, () => console.log(`Server running on port ${port}`));
