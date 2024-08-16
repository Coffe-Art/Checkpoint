const express = require('express');
const router = express.Router();
const productoController = require('../controllers/vistaCompradorController'); 

// Ruta para obtener todos los productos
router.get('/ver/productos', productoController.getAllProductos);

// Ruta para obtener todos los administradores
router.get('/ver/artesanos', productoController.getAllAdministradores);

// Ruta para obtener todas las empresas
router.get('/ver/empresas', productoController.getAllEmpresas);

// Ruta para obtener todos los eventos
router.get('/ver/eventos', productoController.getAllEventos);

// Ruta para obtener productos con su empresa y administrador asociados
router.get('/ver/infoGeneral', productoController.getProductosWithEmpresaAndAdministrador);

// Ruta para obtener productos por ID de empresa
router.get('/ver/empresa/:empresaID', productoController.getProductosByEmpresaID);

// Ruta para obtener empresas por ID de administrador
router.get('/ver/artesano/:adminID', productoController.getEmpresasByAdministradorID);

// Ruta para obtener un producto por ID
router.get('/ver/productos/:productoID', productoController.getProductoByID);

module.exports = router;
