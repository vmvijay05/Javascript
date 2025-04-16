// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(session({
    secret: 'ABCxyz12345@',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin@123",
    database: "Indiamart"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database");

    const createTableQuery = `CREATE TABLE IF NOT EXISTS registration(
        ID int AUTO_INCREMENT PRIMARY KEY,
        Username varchar(255) not null,
        Emailid varchar(255) not null UNIQUE,
        Mobilenumber varchar(20) not null,
        Pin varchar(50) not null
    )`;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error("Error creating table:", err);
        } else {
            console.log("Users table ready");
        }
    });
});

// POST /register
app.post("/details", (req, res) => {
    const { username, email, mobile, password } = req.body;

    const insertQuery = `
        INSERT INTO registration (Username, Emailid, Mobilenumber, Pin)
        VALUES (?, ?, ?, ?)`;

    db.query(insertQuery, [username, email, mobile, password], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ message: "Registration failed!" });
        }
        res.status(200).json({ message: "Registration successful!" });
    });
});

// POST /login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM registration WHERE Emailid = ? AND Pin = ?`;

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
            req.session.email = email; // Store user email in session
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    });
});

// GET /check-session
app.get('/check-session', (req, res) => {
    if (req.session.email) {
        res.status(200).json({ loggedIn: true });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});

// POST /logout
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie('connect.sid');
        res.json({ message: "Logged out successfully" });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
