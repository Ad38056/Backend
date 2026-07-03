const pool = require("../db/db");

// reusable queries
const Product = {
  getAll: () => pool.query("SELECT * FROM products"),
  getById: (id) => pool.query("SELECT * FROM products WHERE id=$1", [id]),
};

module.exports = Product;