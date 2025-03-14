const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (replace with a database later)
let users = [];

// Register User
app.post('/register', (req, res) => {
  const { userId, name, email, phone, password } = req.body;

  // Check if user already exists
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create a new user with an empty accessedFeatures array
  const user = { userId, name, email, phone, password, accessedFeatures: [] };
  users.push(user);

  console.log("User Registered:", user); // Log new user data
  console.log("All Users:", users); // Log all users

  res.status(200).json({ message: 'User registered', user });
});

// Login User
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user by email and password
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    console.log("User Logged In:", user); // Log logged-in user data
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Save Accessed Feature
app.post('/save-feature', (req, res) => {
  const { userId, feature } = req.body;

  // Find the user by userId
  const user = users.find(u => u.userId === userId);

  if (user) {
    // Add the feature to the user's accessedFeatures array
    user.accessedFeatures.push(feature);
    console.log(`Feature "${feature}" saved for user:`, user); // Log updated user data
    res.status(200).json({ message: 'Feature saved', user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get All Users
app.get('/users', (req, res) => {
  console.log("All Users Data:", users); // Log all stored users
  res.status(200).json({ users });
});

// Get User by ID
app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId); // Convert userId to a number
  const user = users.find(u => u.userId === userId);

  if (user) {
    console.log(`Data for User ID ${userId}:`, user); // Log user data
    res.status(200).json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Get All Users
app.get('/users', (req, res) => {
  console.log("All Users:", users);  // ✅ Logs users to console
  res.status(200).json({ users });
});

