const express = require('express');
const { getMessages, createMessage, getMessagesUser } = require('../controllers/messagesController');
const router = express.Router();

// Ruta para obtener los mensajes entre un usuario y un doctor
router.get('/user/:userId/doctor/:doctorId', getMessages);

// Ruta para crear un nuevo mensaje
router.post('/', createMessage);

router.get('/user/:userId', getMessagesUser);


module.exports = router;
