const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./Databse/db');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());

// Serve static files from the "Frontend" folder (located inside your backend folder)
app.use(express.static(path.resolve(__dirname, "Frontend")));

// Parse request bodies before handling routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use('/api', messageRoutes);

// For any other route, serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend","Backend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
