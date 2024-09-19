const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

// Ruta para crear un reporte
router.post('/reportes', reporteController.reportEmpresa);

// Ruta para obtener todos los reportes de una empresa específica
router.get('/reportes/empresa/:codigoempresa', reporteController.getReportesByEmpresa);

// Ruta para resolver un reporte (cambiar su estado a 'resuelto')
router.put('/reportes/:idReporte', reporteController.resolveReporte);

// Ruta para obtener todos los reportes (para administración)
router.get('/reportes', reporteController.getAllReportes);

module.exports = router;
