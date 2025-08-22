const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// CSRF protection
app.use(csurf({ cookie: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to JobBoard API',
    csrfToken: req.csrfToken()
  });
});

// CSRF token route
app.use('/api/csrf', require('./api/routes/csrf'));

// Job routes
app.use('/api/jobs', require('./api/routes/jobs'));

// Error handling middleware for CSRF errors
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    console.error('Invalid CSRF token:', err);
    return res.status(403).json({ 
      success: false, 
      error: 'Invalid CSRF token' 
    });
  }
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

// Vercel serverless function handler
module.exports = app;