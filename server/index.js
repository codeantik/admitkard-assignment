const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const allRoutes = require('./routes/index.js');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// db config
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))

// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(morgan('dev'));


// routes

app.use('/', allRoutes);


// listen

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})
