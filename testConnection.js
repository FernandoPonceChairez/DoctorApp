const db = require('./server/config/db');

const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Conexión a la base de datos exitosa');
    connection.release(); // Libera la conexión al pool
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
  }
};

testConnection();
