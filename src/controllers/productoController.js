const Producto = require('../models/productos');

// Controlador para crear un nuevo producto
exports.createProducto = (req, res) => {
    const { materiales, nombre, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa } = req.body;
    console.log('Datos recibidos:', materiales, nombre, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa);

    Producto.create(materiales, nombre, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa, (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId });
        }
    });
};

// Controlador para obtener detalles de un producto por su ID
exports.getProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    Producto.findById(idProducto, (err, producto) => {
        if (err) {
            console.error('Error al obtener producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            if (producto && producto.length > 0) {
                res.status(200).json(producto[0]);
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        }
    });
};

// Controlador para actualizar un producto existente
exports.updateProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    const { materiales, nombre, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa } = req.body;

    Producto.update(idProducto, materiales, nombre, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa, (err, result) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Producto actualizado exitosamente' });
        }
    });
};

// Controlador para eliminar un producto
exports.deleteProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    Producto.delete(idProducto, (err, result) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        }
    });
};

