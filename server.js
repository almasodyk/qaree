
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection configuration
const db = mysql.createConnection({
    host: "localhost",
    user: "u40066120_qareeb_karar",
    password: "Karrar22@Noor",
    database: "u40066120_qareeb_db"
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Successfully connected to the database.');
});

// Simple API endpoint to test the connection
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working and connected to the database!' });
});

// Example API endpoint for user registration
app.post('/api/register', (req, res) => {
    // Destructure all required fields from the request body
    const { name, email, password, phoneNumber, governorate, district, landmark } = req.body;
    
    const sql = 'INSERT INTO users (name, email, password, phone_number, governorate, district, landmark) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    // Pass the new fields in the array of values
    db.query(sql, [name, email, password, phoneNumber, governorate, district, landmark], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to register user', details: err.sqlMessage });
            return;
        }
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
