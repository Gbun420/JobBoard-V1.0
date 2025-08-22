const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/db');

const app = express();

// Connect to database (but don't fail the entire app if DB connection fails)
connectDB().catch(err => {
  console.error('Failed to connect to database:', err.message);
  // In a real application, you might want to set a flag to indicate DB connection status
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes that don't need CSRF protection
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// CSRF protection (applied after the health check route)
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