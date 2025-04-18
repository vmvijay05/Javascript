// server/admin.js
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       
  password: "Admin@123",        
  database: "ecommerce" 
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// GET all products
app.get("/get-products", (req, res) => {
  const sql = "SELECT * FROM createproducts";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Failed to get products:", err);
      res.status(500).json({ message: "Failed to get products" });
    } else {
      res.json(result);
    }
  });
});

// CREATE new product
app.post('/create-product', async (req, res) => {
  const { product_name, description, image, price, stock } = req.body;

  const query = 'INSERT INTO createproducts (product_name, description, image, price, stock) VALUES (?, ?, ?, ?, ?)';

  try {
    await db.query(query, [product_name, description, image, price, stock]);
    res.status(200).json({ message: 'Product created successfully' });
  } catch (err) {
    console.error('Error inserting product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
