const db = require('../config/db');
const bcrypt = require('bcrypt');


// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const { id } = req.params; // ID del usuario desde la URL
  try {
    const [rows] = await db.query('SELECT id, name, email, phone, address, image_url FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(rows[0]); // Devuelve los datos del usuario
  } catch (error) {
    console.error('Error al obtener el usuario:', error.message);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};
// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, image_url } = req.body;

    // Verificar si el correo ya está registrado
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario en la base de datos
    await db.query(
      'INSERT INTO users (name, email, password, phone, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone, image_url]
    );

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

// Iniciar sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por correo
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    res.json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Actualizar datos de un usuario
const updateUser = async (req, res) => {
  const { id } = req.params; // ID del usuario desde la URL
  const { name, email, phone, address, image_url } = req.body; // Nuevos datos del usuario

  try {
    // Verificar si el usuario existe
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los datos del usuario
    await db.query(
      'UPDATE users SET name = ?, email = ?, phone = ?, address = ?, image_url = ? WHERE id = ?',
      [name, email, phone, address, image_url, id]
    );

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error.message);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};


module.exports = { registerUser, loginUser, getUserById, updateUser };

