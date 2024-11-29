const express = require('express');
const { registerUser, loginUser, getUserById, updateUser } = require('../controllers/usersController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById); // Obtener datos de un usuario por ID
router.put('/:id', updateUser); // Actualizar datos de un usuario

module.exports = router;
