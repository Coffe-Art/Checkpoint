const express = require('express');
const router = express.Router();
const reporteProductoController = require('../controllers/reporteProductoController');

// Crear un reporte de producto
router.post('/crear-reporte-producto', reporteProductoController.crearReporte);

// Obtener todos los reportes de productos
router.get('/reportes-producto', reporteProductoController.obtenerReportes);

// Resolver un reporte de producto
router.put('/resolver-reporte-producto/:idReporteP', reporteProductoController.resolverReporte);

module.exports = router;
