require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const config = require('./utils/config');

// connect to the MongoDB database
mongoose.connect(config.DB_URI)
.then(res => {
    logger.info('Successfuly connected to the MongoDB database');
})
.catch(err => {
    logger.error('Cannot connect to the MongoDB database', err);
});

// init middlewares
app.use(cors());

app.use(express.json());

// init route middlewares
app.use('/api/blogs', blogsRouter);

// export app
module.exports = app;