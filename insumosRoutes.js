// src/routes/insumoRoutes.js
const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumoController');

// Ruta para crear un nuevo insumo
router.post('/nuevoInsumo', insumoController.createInsumo);

// Ruta para obtener detalles de un insumo específico
router.get('/consultar/:idInsumo', insumoController.getInsumo);

// Ruta para actualizar un insumo existente
router.put('/actualizar/:idInsumo', insumoController.updateInsumo);

// Ruta para eliminar un insumo
router.delete('/eliminar/:idInsumo', insumoController.deleteInsumo);

// Ruta para obtener todos los insumos de una empresa específica
router.get('/insumosPorEmpresa/:codigoEmpresa', insumoController.getInsumosByEmpresa);

module.exports = router;
