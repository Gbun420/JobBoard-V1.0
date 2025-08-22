const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is provided
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // In production, you might want to handle this differently
    // For now, we'll rethrow the error to be handled by the server
    throw error;
  }
};

module.exports = connectDB;