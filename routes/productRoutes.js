const express = require("express");
const router = express.Router();
const pool = require("../db/db");


// 🔹 GET all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 GET single product
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 CREATE product
router.post("/", async (req, res) => {
  try {
    const { name, category, price, stock, image } = req.body;

    const result = await pool.query(
      "INSERT INTO products (name, category, price, stock, image) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, category, price, stock, image]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const { name, category, price, stock, image } = req.body;

    const result = await pool.query(
      "UPDATE products SET name=$1, category=$2, price=$3, stock=$4, image=$5 WHERE id=$6 RETURNING *",
      [name, category, price, stock, image, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [
      req.params.id,
    ]);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;