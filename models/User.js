const db = require("../db");

// Create users table
db.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT
);
`);

module.exports = db;