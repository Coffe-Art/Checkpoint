const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', authController.register);

// Ruta para el inicio de sesión de usuarios
router.post('/login', authController.login);

// Ruta para solicitar el restablecimiento de contraseña
router.post('/request-password-reset', authController.requestPasswordReset);

// Ruta para verificar el código de restablecimiento de contraseña
router.post('/verify-reset-code', authController.verifyCode);

// Ruta para restablecer la contraseña
router.post('/reset-password', authController.resetPassword);

module.exports = router;