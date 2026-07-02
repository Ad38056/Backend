const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

// GET all products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE product

router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);

    const saved = await product.save();

    res.json(saved);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
