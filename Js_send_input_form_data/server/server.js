const express = require("express");
const cors = require("cors"); // Allow cross-origin requests

const app = express();
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    console.log("Received Registration Data:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    res.json({ message: "Registration successful!" });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
