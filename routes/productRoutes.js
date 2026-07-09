const express = require("express");
const router = express.Router();
const db = require("../db");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


// 🔹 CREATE PRODUCT (ADMIN ONLY)
router.post("/", auth, role("admin"), async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const result = await db.query(
      "INSERT INTO products (name, price, description) VALUES ($1,$2,$3) RETURNING *",
      [name, price, description]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 GET ALL PRODUCTS (LOGIN REQUIRED)
router.get("/", auth, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 GET SINGLE PRODUCT
router.get("/:id", auth, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM products WHERE id=$1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 UPDATE PRODUCT (ADMIN ONLY)
router.put("/:id", auth, role("admin"), async (req, res) => {
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


// 🔹 DELETE PRODUCT (ADMIN ONLY)
router.delete("/:id", auth, role("admin"), async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id=$1", [req.params.id]);

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;