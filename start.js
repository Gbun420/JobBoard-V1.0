const app = require('./server');
const connectDB = require('./config/db');

// Connect to database and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`JobBoard server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err.message);
  process.exit(1);
});