const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Dirección del servidor
  user: process.env.DB_USER,       // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña
  database: process.env.DB_NAME,   // Nombre de la base de datos
  port: process.env.DB_PORT || 3306, // Puerto (por defecto 3306)
});

module.exports = pool;
