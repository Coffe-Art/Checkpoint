const express = require('express');
const router = express.Router();
const vistaCompradorController = require('../controllers/vistaCompradorController'); 

// Ruta para obtener todos los productos disponibles
router.get('/ver/productos', vistaCompradorController.getAllProductos);

// Ruta para obtener todos los administradores (en este contexto, llamados "artesanos")
router.get('/ver/artesanos', vistaCompradorController.getAllAdministradores);

// Ruta para obtener todas las empresas registradas
router.get('/ver/empresas', vistaCompradorController.getAllEmpresas);

// Ruta para obtener todos los eventos disponibles
router.get('/ver/eventos', vistaCompradorController.getAllEventos);

// Ruta para obtener una vista general de los productos con su empresa y administrador asociados
router.get('/ver/infoGeneral', vistaCompradorController.getProductosWithEmpresaAndAdministrador);

// Ruta para obtener todos los productos relacionados a una empresa específica por su ID
router.get('/ver/empresa/:empresaID', vistaCompradorController.getProductosByEmpresaID);

// Ruta para obtener todas las empresas gestionadas por un administrador específico (artesano) por su ID
router.get('/ver/artesano/:adminID', vistaCompradorController.getEmpresasByAdministradorID);

// Ruta para obtener los detalles de un producto específico por su ID
router.get('/ver/productos/:productoID', vistaCompradorController.getProductoByID);

// Ruta para consultar los detalles de un administrador específico (artesano) por su ID
router.get('/ver/infoArtesano/:adminID', vistaCompradorController.getAdministradorByID);

// Ruta para consultar los detalles de una empresa específica por su ID
router.get('/ver/infoEmpresa/:empresaID', vistaCompradorController.getEmpresaByID);

// Nueva Ruta para obtener los detalles de una empresa y su administrador asociado por el ID de la empresa
router.get('/ver/empresaAdmin/:empresaID', vistaCompradorController.getEmpresaConAdministrador);

module.exports = router;
