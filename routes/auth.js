const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para login
router.post('/login', authController.login);

// Ruta para registro (opcional, dependiendo de si quieres permitir el registro de usuarios)
router.post('/register', authController.register);

module.exports = router;