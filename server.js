const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./Databse/db');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect to the database
connectDB();

// Use CORS middleware (customize as needed)
app.use(cors());

// Serve static files from the "Frontend" folder
app.use(express.static(path.resolve(__dirname, 'Frontend')));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use('/api', messageRoutes);

// For any other route, serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Frontend', 'Backend', 'index.html'));
});

// If running locally, start the server; otherwise export the app for Vercel's serverless function
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
