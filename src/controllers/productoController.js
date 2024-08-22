const express = require('express');
const router = express.Router();
const Producto = require('../models/productos');
const path = require('path');
const fs = require('fs');
const createContainerClient = require('../config/azureStorageConfig'); // Importa la función async

// Controlador para crear un producto
exports.createProducto = async (req, res) => {
    const { materiales, nombre, categoria, precio, descripcion, cantidad, publicadoPor, codigoempresa, idAdministrador } = req.body;
    const file = req.file;
    const urlProductoImg = file ? `/uploads/${file.filename}` : null;

    try {
        if (!nombre || !precio) {
            return res.status(400).json({ error: 'Nombre y precio son requeridos' });
        }

        // Crear cliente de contenedor de manera asíncrona
        const containerClient = await createContainerClient();

        Producto.create(materiales, nombre, categoria, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa, idAdministrador, async (err, result) => {
            if (err) {
                console.error('Error al crear producto:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            if (file) {
                const blobName = file.filename;
                const blockBlobClient = containerClient.getBlockBlobClient(blobName);

                const filePath = path.join(__dirname, '..', 'uploads', file.filename);
                const fileStream = fs.createReadStream(filePath);

                try {
                    await blockBlobClient.uploadStream(fileStream);
                    fs.unlinkSync(filePath); // Eliminar archivo local después de subirlo
                } catch (uploadErr) {
                    console.error('Error al subir archivo a Azure:', uploadErr);
                    return res.status(500).json({ error: 'Error al subir archivo a Azure Blob Storage' });
                }
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

    Producto.update(idProducto, materiales, nombre, categoria, precio, descripcion, cantidad, publicadoPor, codigoempresa, idAdministrador, (err, result) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    });
};

// Controlador para eliminar un producto
exports.deleteProducto = async (req, res) => {
    const idProducto = req.params.idProducto;

    try {
        // Primero obtén el producto para obtener la URL de la imagen
        const producto = await new Promise((resolve, reject) => {
            Producto.findById(idProducto, (err, result) => {
                if (err) return reject(err);
                resolve(result && result.length > 0 ? result[0] : null);
            });
        });

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Eliminar el producto de la base de datos
        await new Promise((resolve, reject) => {
            Producto.delete(idProducto, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        // Aquí puedes agregar código para eliminar la imagen del producto de Azure Blob Storage si es necesario

        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (err) {
        console.error('Error al eliminar producto:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
