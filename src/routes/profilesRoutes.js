const express = require('express');
const profilesController = require('../controllers/profilesController');

const router = express.Router();

// Rutas para obtenerla info Administrador
router.get('/administrador/:idadministrador', profilesController.getAdministradorById);
// Ruta para actualizar Administrador
router.put('/administrador/update/:idadministrador', profilesController.updateAdministrador);

// Rutas para obtener la info Comprador
router.get('/comprador/:idComprador', profilesController.getCompradorById);
// Ruta para actualizar Comprador
router.put('/comprador/update/:idComprador', profilesController.updateComprador);

module.exports = router;
