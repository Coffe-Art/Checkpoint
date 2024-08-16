const Producto = require('../models/vistaComprador'); // Asegúrate de ajustar la ruta al modelo

const productoController = {};

// Obtener todos los productos
productoController.getAllProductos = (req, res) => {
    Producto.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener todos los administradores
productoController.getAllAdministradores = (req, res) => {
    Producto.getAllAdministradores((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener todas las empresas
productoController.getAllEmpresas = (req, res) => {
    Producto.getAllEmpresas((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener todos los eventos
productoController.getAllEventos = (req, res) => {
    Producto.getAllEventos((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener productos con su empresa y administrador asociados
productoController.getProductosWithEmpresaAndAdministrador = (req, res) => {
    Producto.getProductosWithEmpresaAndAdministrador((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener productos por ID de empresa
productoController.getProductosByEmpresaID = (req, res) => {
    const empresaID = req.params.empresaID;
    Producto.getProductosByEmpresaID(empresaID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener empresas por ID de administrador
productoController.getEmpresasByAdministradorID = (req, res) => {
    const adminID = req.params.adminID;
    Producto.getEmpresasByAdministradorID(adminID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener producto por ID
productoController.getProductoByID = (req, res) => {
    const productoID = req.params.productoID;
    Producto.getProductoByID(productoID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

module.exports = productoController;
