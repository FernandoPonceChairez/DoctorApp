const db = require('../config/db');

// Obtener todas las citas de un usuario
const getAppointments = async (req, res) => {
  const { userId } = req.query;
  try {
    const [rows] = await db.query('SELECT * FROM appointments WHERE user_id = ?', [userId]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener citas:', error.message);
    res.status(500).json({ message: 'Error al obtener citas' });
  }
};

const createAppointment = async (req, res) => {
  const { user_id, doctor_id, date, type, status } = req.body;
  try {
    const query = 'INSERT INTO appointments (user_id, doctor_id, date, type, status) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(query, [user_id, doctor_id, date, type, status]);

    res.status(201).json({ message: 'Appointment created successfully', appointment_id: result.insertId });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Error creating appointment' });
  }
};

// Actualizar una cita existente
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, type, status } = req.body;
  try {
    await db.query(
      'UPDATE appointments SET date = ?, type = ?, status = ? WHERE id = ?',
      [date, type, status, id]
    );
    res.json({ message: 'Cita actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar cita:', error.message);
    res.status(500).json({ message: 'Error al actualizar cita' });
  }
};

// Eliminar una cita
const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM appointments WHERE id = ?', [id]);
    res.json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar cita:', error.message);
    res.status(500).json({ message: 'Error al eliminar cita' });
  }
};

const getAppointmentsByUser = async (req, res) => {
  const { user_id } = req.query;  // Obtenemos el user_id de la query string
  
  console.log('user_id recibido:', user_id);  // Depurar para asegurarnos de que `user_id` llega correctamente

  try {
    // Verificar que `user_id` esté presente
    if (!user_id) {
      console.log('Error: user_id no proporcionado');
      return res.status(400).json({ message: 'user_id es requerido' });
    }

    // Realizar la consulta SQL para obtener las citas del usuario
    const query = 'SELECT * FROM appointments WHERE user_id = ?'; 
    console.log('Consulta SQL:', query, 'Parametros:', [user_id]);  // Verifica que la consulta esté correcta
    
    const [rows] = await db.query(query, [user_id]);  // Ejecutamos la consulta

    // Verificamos si se encontraron resultados
    if (rows.length === 0) {
      console.log('No se encontraron citas para el usuario');
      return res.status(404).json({ message: 'No se encontraron citas para este usuario' });
    }

    // Devolvemos las citas encontradas
    console.log('Citas encontradas:', rows);  // Imprime las citas encontradas para depuración
    res.json(rows);  // Devolvemos las citas en formato JSON

  } catch (error) {
    // Si ocurre algún error, lo capturamos y devolvemos un mensaje adecuado
    console.error('Error al obtener citas:', error);
    res.status(500).json({ message: 'Error al obtener las citas' });
  }
};


module.exports = { getAppointments, createAppointment, updateAppointment, deleteAppointment, getAppointmentsByUser };
