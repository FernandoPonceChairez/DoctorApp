const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const doctorsRoutes = require('./routes/doctorsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/doctors', doctorsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/messages', messagesRoutes)
// Función para comprobar la conexión a la base de datos
const startServer = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Conexión a la base de datos MySQL exitosa');
    connection.release();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
};

startServer();
