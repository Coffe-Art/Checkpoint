const Producto = require('../models/productos');
const upload = require('../config/uploadConfig'); // Ruta correcta a tu configuración de multer
const express = require('express');
const router = express.Router();

// Controlador para crear un nuevo producto
exports.createProducto = (req, res) => {
    const { materiales, nombre, categoria, precio, descripcion, cantidad, publicadoPor, codigoempresa, idAdministrador } = req.body;
    const urlProductoImg = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        if (!nombre || !precio) {
            return res.status(400).json({ error: 'Nombre y precio son requeridos' });
        }
        
        Producto.create(materiales, nombre, categoria, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa, idAdministrador, (err, result) => {
            if (err) {
                console.error('Error al crear producto:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId, urlProductoImg });
        });
    } catch (err) {
        console.error('Error al crear producto:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener detalles de un producto por su ID
exports.getProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    
    Producto.findById(idProducto, (err, producto) => {
        if (err) {
            console.error('Error al obtener producto:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (producto && producto.length > 0) {
            res.status(200).json(producto[0]);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    });
};

// Controlador para obtener productos por idAdministrador
exports.getProductosByIdAdministrador = (req, res) => {
    const idAdministrador = req.params.idAdministrador;

    Producto.findByIdAdministrador(idAdministrador, (err, productos) => {
        if (err) {
            console.error('Error al obtener productos por idAdministrador:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json(productos);
    });
};

// Controlador para obtener productos por codigoEmpresa
exports.getProductosByCodigoEmpresa = (req, res) => {
    const codigoempresa = req.params.codigoempresa;

    Producto.findByCodigoEmpresa(codigoempresa, (err, productos) => {
        if (err) {
            console.error('Error al obtener productos por codigoEmpresa:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json(productos);
    });
};

// Controlador para actualizar un producto existente
exports.updateProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    const { materiales, nombre, categoria, precio, descripcion, cantidad, publicadoPor, codigoempresa, idAdministrador } = req.body;
    const urlProductoImg = req.file ? `/uploads/${req.file.filename}` : null;

    Producto.update(idProducto, materiales, nombre, categoria, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa, idAdministrador, (err, result) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente', urlProductoImg });
    });
};

// Controlador para eliminar un producto
exports.deleteProducto = (req, res) => {
    const idProducto = req.params.idProducto;

    Producto.delete(idProducto, (err) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    });
};
