const express = require('express');
const router = express.Router();
const upload = require('../config/uploadConfig'); // Ruta correcta a tu configuración de multer
const productoController = require('../controllers/productoController');

// Ruta para crear un nuevo producto con archivo
router.post('/nuevoProducto', upload.single('urlProductoImg'), productoController.createProducto);

// Ruta para obtener un producto por ID
router.get('/obtenerProducto/:idProducto', productoController.getProducto);

// Ruta para obtener productos por idAdministrador
router.get('/obtenerPorAdministrador/:idAdministrador', productoController.getProductosByIdAdministrador);

// Ruta para obtener productos por codigoEmpresa
router.get('/obtenerPorEmpresa/:codigoempresa', productoController.getProductosByCodigoEmpresa);

// Ruta para actualizar un producto con archivo
router.put('/actualizarProducto/:idProducto', upload.single('urlProductoImg'), productoController.updateProducto);

// Ruta para eliminar un producto
router.delete('/eliminar/:idProducto', productoController.deleteProducto);

module.exports = router;
