const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const mysql = require('mysql2');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: `${process.env.USER}`,
  password: `${process.env.PASS}`,
  database: `${process.env.DB}`,
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
});

// Example route to test the connection
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.promise().query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Server error');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT user_type FROM users WHERE username = ? AND password = ?';

  try {
    const [result] = await pool.promise().query(sql, [username, password]);

    console.log(result); // Log the entire result to see the structure

    // Check if result is empty
    if (!result || result.length === 0) {
      return res.status(401).send('Invalid username or password');
    }

    const { user_type } = result[0]; // Destructure user_type from the first result
    res.json({ user_type }); // Send user_type back to the client

  } catch (err) {
    console.error('Database error:', err); // Log the error for debugging
    return res.status(500).send('Server error'); // Send a 500 error response
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, password, user_type = 'Customer', address, locality } = req.body;

  // SQL query to insert a new user
  const sql = 'INSERT INTO users (username, password, user_type, address, locality) VALUES (?, ?, ?, ?, ?)';

  try {
    // Check if username already exists
    const checkUserSql = 'SELECT * FROM users WHERE username = ?';
    const [existingUser] = await pool.promise().query(checkUserSql, [username]);

    if (existingUser.length > 0) {
      return res.status(409).send('Username already exists'); // Conflict status
    }

    // Insert new user
    await pool.promise().query(sql, [username, password, user_type, address, locality]);

    res.status(201).send('User registered successfully'); // 201 Created status
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
