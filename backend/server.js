// app.js
const express = require('express');
const path = require("path")
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const port = process.env.PORT || 8082;



console.log(`Your port is${process.env.MONGO_URI}`);
// routes
const equipment = require('./routes/api/equipment');

const app = express();

// Ensures forms are readable
app.use(express.urlencoded({extended: true}))

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.sendFile(__dirname + '/page.html'));
console.log(__dirname);
// use Routes
app.use('/api/equipment', equipment);


app.listen(port, () => console.log(`Server running on port ${port}`));
