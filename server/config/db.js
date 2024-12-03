require('dotenv').config(); // Carga las variables desde el archivo .env

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'doctor_app',
  port: process.env.DB_PORT || 3306,
});

module.exports = pool;
