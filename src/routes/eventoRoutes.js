const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

// Ruta para crear un evento
router.post('/', eventoController.createEvento);

// Ruta para obtener todos los eventos
router.get('/', eventoController.getAllEventos);

// Ruta para obtener eventos por idAdministrador
router.get('/admin/:idAdministrador', eventoController.getEventosPorAdministrador);

// Ruta para obtener un evento por ID
router.get('/:idEvento', eventoController.getEventoById);

// Ruta para actualizar un evento
router.put('/:idEvento', eventoController.updateEvento);

// Ruta para eliminar un evento
router.delete('/:idEvento', eventoController.deleteEvento);

module.exports = router;
