const { Pool } = require("pg");

const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "cercle_de_projet",
  port: 5432,
});

module.exports = db;
