const db = require('../config/db');

const addDoctor = async (req, res) => {
  const { name, phone, specialty, zone, image_url, experience_years, patient_count, available_hours, address } = req.body;
  try {
    await db.query(
      'INSERT INTO doctors (name, phone, specialty, zone, image_url, experience_years, patient_count, available_hours, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, phone, specialty, zone, image_url, experience_years, patient_count, available_hours, address]
    );
    res.status(201).json({ message: 'Doctor agregado correctamente' });
  } catch (error) {
    console.error('Error al agregar doctor:', error.message);
    res.status(500).json({ message: 'Error al agregar doctor' });
  }
};

// Backend (Node.js con Express)
const getDoctorById = async (req, res) => {
  const { id } = req.params;  // Obtenemos el ID del doctor desde la URL

  try {
    // Consulta a la base de datos para obtener el doctor por ID
    const query = 'SELECT * FROM doctors WHERE id = ?';  // Consulta SQL para obtener el doctor
    const [rows] = await db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });  // Si no encontramos al doctor, devolvemos un 404
    }

    // Si encontramos al doctor, lo devolvemos como respuesta
    res.json(rows[0]);  // Asumimos que `rows[0]` contiene los datos del doctor
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Error fetching doctor' });
  }
};



// Obtener doctores con parámetros de búsqueda
const getDoctors = async (req, res) => {
  const { specialty, zone, availableDays } = req.query;
  try {
    let query = 'SELECT * FROM doctors WHERE 1=1'; // Empieza con una consulta básica

    const params = [];
    if (specialty) {
      query += ' AND specialty = ?';
      params.push(specialty);
    }
    if (zone) {
      query += ' AND zone = ?';
      params.push(zone);
    }
    if (availableDays) {
      query += ' AND available_hours LIKE ?';
      params.push(`%${availableDays}%`); // Filtrar disponibilidad por días
    }

    const [rows] = await db.query(query, params);
    res.json(rows); // Devuelve los doctores filtrados
  } catch (error) {
    console.error('Error al obtener los doctores:', error);
    res.status(500).json({ message: 'Error al obtener los doctores' });
  }
};


const searchDoctors = async (req, res) => {
  const { specialty, zone, name } = req.query; // Obtenemos los parámetros de búsqueda

  try {
    // Construir la consulta SQL con condiciones dinámicas
    let query = 'SELECT * FROM doctors WHERE 1=1'; // 1=1 es siempre verdadero, nos permite agregar condiciones dinámicas
    const queryParams = [];

    if (specialty) {
      query += ' AND specialty = ?';
      queryParams.push(specialty);
    }

    if (zone) {
      query += ' AND zone = ?';
      queryParams.push(zone);
    }

    if (name) {
      query += ' AND name LIKE ?';
      queryParams.push(`%${name}%`); // Buscar nombre que contenga el valor proporcionado
    }

    const [rows] = await db.query(query, queryParams);

    res.json(rows); // Devolver los resultados de la búsqueda
  } catch (error) {
    console.error('Error al buscar doctores:', error);
    res.status(500).json({ message: 'Error al buscar doctores' });
  }
};


module.exports = { getDoctors, addDoctor, searchDoctors, getDoctorById };
