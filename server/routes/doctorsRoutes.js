const express = require('express');
const { getDoctors, addDoctor, getDoctorById } = require('../controllers/doctorsController');
const router = express.Router();

router.get('/', getDoctors);
router.post('/', addDoctor);
router.get('/:id', getDoctorById);

module.exports = router;
