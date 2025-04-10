const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json()); // Parses incoming JSON data


// MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin@123",
    database: "ecommerce"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database");

    const createTableQuery = `CREATE TABLE IF NOT EXISTS registration(
        ID int not null primary key UNIQUE,
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

// POST route for data
app.post("/details", (req, res) => {
    const { username, email, mobile, password } = req.body;

    const insertQuery = `
        INSERT INTO registration (Username, Emailid, Mobilenumber, Pin)
        VALUES (?, ?, ?, ?) `;

    db.query(insertQuery, [username, email, mobile, password], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ message: "Registration failed!" });
        }
        res.status(200).json({ message: "Registration successful!" });
    });
});

// Fallback route for unknown endpoints
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at 8000`);
});
