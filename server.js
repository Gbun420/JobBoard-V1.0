const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to JobBoard API' });
});

// Job routes
app.use('/api/jobs', require('./api/routes/jobs'));

// Vercel serverless function handler
module.exports = app;