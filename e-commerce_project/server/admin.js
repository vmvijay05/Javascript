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

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// GET all products
app.get("/get-products", (req, res) => {
  const sql = `
    SELECT
      product_ID       AS product_id,
      product_name     AS product_name,
      product_description AS description,
      image            AS image,
      price            AS price,
      stock            AS stock
    FROM createproducts
  `;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Failed to get products:", err);
      return res.status(500).json({ message: "Failed to get products" });
    }
    res.json(rows);
  });
});

// CREATE new product
app.post("/create-product", (req, res) => {
  const { product_name, description, image, price, stock } = req.body;

  const query = `
    INSERT INTO createproducts
      (product_name, product_description, image, price, stock)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [product_name, description, image, price, stock],
    (err, result) => {
      if (err) {
        console.error("Error inserting product:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res
        .status(200)
        .json({ message: "Product created successfully", insertId: result.insertId });
    }
  );
});

// ADD to cart
app.post("/add-to-cart", (req, res) => {
  const { product_id } = req.body;

  // Simulate user ID (in real use case, get it from session or token)
  const user_id = 1;

  const sql = `
    INSERT INTO carttable (user_id, product_id)
    VALUES (?, ?)
  `;
  db.query(sql, [user_id, product_id], (err, result) => {
    if (err) {
      console.error("Failed to add to cart:", err);
      return res.status(500).json({ message: "Failed to add to cart" });
    }
    res.json({ message: "Product added to cart successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
