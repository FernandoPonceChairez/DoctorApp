const express = require('express');
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByUser,
} = require('../controllers/appointmentsController');
const router = express.Router();

router.get('/', getAppointments);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);
router.get('/user/', getAppointmentsByUser);

module.exports = router;
