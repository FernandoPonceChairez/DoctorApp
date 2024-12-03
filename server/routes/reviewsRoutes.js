const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener reseñas de un doctor
router.get('/:doctorId/reviews', async (req, res) => {
  const { doctorId } = req.params;
  try {
    const query = 'SELECT * FROM reviews WHERE doctor_id = ? ORDER BY created_at DESC';
    const [reviews] = await db.query(query, [doctorId]);
    res.json(reviews);
  } catch (error) {
    console.error('Error al obtener reseñas:', error.message);
    res.status(500).json({ message: 'Error al obtener reseñas' });
  }
});

// Agregar una reseña
router.post('/:doctorId/reviews', async (req, res) => {
  const { doctorId } = req.params;
  const { rating, comment } = req.body;

  try {
    const query = 'INSERT INTO reviews (doctor_id, rating, comment) VALUES (?, ?, ?)';
    await db.query(query, [doctorId, rating, comment]);
    res.status(201).json({ message: 'Reseña agregada correctamente' });
  } catch (error) {
    console.error('Error al agregar la reseña:', error.message);
    res.status(500).json({ message: 'Error al agregar la reseña' });
  }
});

module.exports = router;
