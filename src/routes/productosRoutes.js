// src/routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

console.log('Registering producto routes');

// Ruta para crear un nuevo producto
router.post('/nuevoProducto', (req, res) => {
    console.log('POST /nuevoProducto');
    productoController.createProducto(req, res);
});

// Ruta para obtener detalles de un producto específico
router.get('/consultar/:idProducto', (req, res) => {
    console.log('GET /consultar/:idProducto');
    productoController.getProducto(req, res);
});

// Ruta para actualizar un producto existente
router.put('/actualizar/:idProducto', (req, res) => {
    console.log('PUT /actualizar/:idProducto');
    productoController.updateProducto(req, res);
});

// Ruta para eliminar un producto
router.delete('/eliminar/:idProducto', (req, res) => {
    console.log('DELETE /eliminar/:idProducto');
    productoController.deleteProducto(req, res);
});

module.exports = router;
