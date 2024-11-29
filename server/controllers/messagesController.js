const db = require('../config/db'); // Tu archivo de configuración de la base de datos

// Obtener los mensajes entre un usuario y un doctor
const getMessages = async (req, res) => {
  const { userId, doctorId } = req.params;

  try {
    const query = 'SELECT * FROM messages WHERE user_id = ? AND doctor_id = ?';
    const [messages] = await db.query(query, [userId, doctorId]);
    
    res.json(messages);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ message: 'Error al obtener mensajes' });
  }
};

const getMessagesUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const query = 'SELECT * FROM messages WHERE user_id = ?';
    const [messages] = await db.query(query, [userId]);
    
    if (messages.length === 0) {
      return res.status(404).json({ message: 'No se encontraron mensajes' });
    }

    res.json(messages);
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    res.status(500).json({ message: 'Error al obtener los mensajes' });
  }
};

// Crear un nuevo mensaje
const createMessage = async (req, res) => {
    const { user_id, doctor_id, message, sender } = req.body;
  
    try {
      const query = 'INSERT INTO messages (user_id, doctor_id, message, sender) VALUES (?, ?, ?, ?)';
      await db.query(query, [user_id, doctor_id, message, sender]);
  
      res.status(201).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
      console.error('Error al crear mensaje:', error);
      res.status(500).json({ message: 'Error al crear mensaje' });
    }
  };

module.exports = { getMessages, createMessage, getMessagesUser };
