const express = require('express');
const router = express.Router();
const vistaCompradorController = require('../controllers/vistaCompradorController'); 

// Ruta para obtener todos los productos
router.get('/ver/productos', vistaCompradorController.getAllProductos);

// Ruta para obtener todos los administradores
router.get('/ver/artesanos', vistaCompradorController.getAllAdministradores);

// Ruta para obtener todas las empresas
router.get('/ver/empresas', vistaCompradorController.getAllEmpresas);

// Ruta para obtener todos los eventos
router.get('/ver/eventos', vistaCompradorController.getAllEventos);

// Ruta para obtener productos con su empresa y administrador asociados
router.get('/ver/infoGeneral', vistaCompradorController.getProductosWithEmpresaAndAdministrador);

// Ruta para obtener productos por ID de empresa
router.get('/ver/empresa/:empresaID', vistaCompradorController.getProductosByEmpresaID);

// Ruta para obtener empresas por ID de administrador
router.get('/ver/artesano/:adminID', vistaCompradorController.getEmpresasByAdministradorID);

// Ruta para obtener un producto por ID
router.get('/ver/productos/:productoID', vistaCompradorController.getProductoByID);

// Ruta para consultar un administrador por ID
router.get('/ver/infoArtesano/:adminID', vistaCompradorController.getAdministradorByID);

// Ruta para consultar una empresa por ID
router.get('/ver/infoEmpresa/:empresaID', vistaCompradorController.getEmpresaByID);

module.exports = router;
