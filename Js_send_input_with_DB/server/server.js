const http = require("http");
const mysql = require("mysql");
const { parse } = require("querystring");

const PORT = 3000;

// MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin@123",
    database: "Registration"
});

//err=db.connect()

db.connect(err => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to MySQL Database");

    // Create table if not exists
    const createTableQuery = `CREATE TABLE IF NOT EXISTS person_details(
           Id INT AUTO_INCREMENT PRIMARY KEY,
    User_name VARCHAR(100) NOT NULL,
    Email_id VARCHAR(255) UNIQUE,
    Mobile_number INT NOT NULL,
    Psw VARCHAR(100) NOT NULL
    )`;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error("Error creating table: ", err);
        } else {
            console.log("Users table ready");
        }
    });
});

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    if (req.method === "POST" && req.url === "/register") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const { username, email, mobile, password } = JSON.parse(body);
            //console.log(">>>" ,typeof mobile);
            const insertQuery = "INSERT INTO person_details (User_name, Email_id, Mobile_number,Psw) VALUES (?, ?, ?, ?)";
            db.query(insertQuery, [username, email, mobile, password], (err, result) => {  //sends the SQL query to myql
                if (err) {
                    console.error("Error inserting data: ", err);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ message: "Registration failed!" }));
                }
                else{
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Registration successful!" }));
                }
            });
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
