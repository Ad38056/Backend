const express = require("express");
const router = express.Router();

// IMPORTANT: correct import
const db = require("../db");

// CREATE product
router.post("/", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const result = await db.query(
      "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *",
      [name, price, description]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products WHERE id=$1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const result = await db.query(
      "UPDATE products SET name=$1, price=$2, description=$3 WHERE id=$4 RETURNING *",
      [name, price, description, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;