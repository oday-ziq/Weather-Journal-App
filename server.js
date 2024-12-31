// Import required dependencies
const express = require('express');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('website'));

// Initialize projectData object
let projectData = {};

// GET Route
app.get('/getData', (req, res) => {
  res.send(projectData);
});

// POST Route
app.post('/addData', (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData = { temperature, date, userResponse };
  res.send({ message: 'Data added successfully' });
});

// Setup Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
