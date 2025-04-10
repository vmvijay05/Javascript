// Updated Node.js Backend with Auto-Render of res.html
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();
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
    saveUninitialized: true,
    cookie: { secure: false }
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'Indiamart'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Handle POST request to /login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM registration WHERE Emailid = ? AND Pin = ?`;

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    });
});

// Handle GET request to /home.html
app.get('/home', (req, res) => {
    if (req.session.mobile) {
        res.sendFile(path.join(__dirname, '../client' ,'home.html'));
    } else {
        res.redirect('/');
    }
});

// Logout Route
app.post('/logout', (req, res) => {
    res.clearCookie('sessionId'); // Clear session cookie if used
    req.session.destroy(err => {  
        if (err) {
            return res.status(500).json({ success: false, message: "Logout failed" });
        }
        res.json({ success: true, message: "Logged out successfully" });
    });
});

app.listen(8000, () => console.log('Server running on port 8000'));
















// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());

// app.use(cors({
//     origin: 'http://127.0.0.1:5500',
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type']
// }));

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Admin@123',
//     database: 'Indiamart'
// });

// // Connect to MySQL
// db.connect(err => {
//     if (err) {
//         console.error('Database connection failed:', err);
//     } else {
//         console.log('Connected to MySQL database');
//     }
// });

// // Handle POST request to /mobile
// app.post('/mobile', (req, res) => {
//     const { mobile } = req.body;

//     if (!mobile) {
//         console.error("Mobile number not received");
//         return res.status(400).json({ message: "Mobile number is required" });
//     }

//     const sql = 'INSERT INTO login_page (Mobile_number) VALUES (?)';

//     db.query(sql, [mobile], (err) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             res.status(500).json({ message: "Database query failed", error: err });
//         } else {
//             res.status(200).json({ message: 'Mobile number saved successfully' });
//         }
//     });
// });

//     // Start the server
//     app.listen(8000, () => console.log('Server running on port 8000'));
