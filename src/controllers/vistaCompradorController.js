const vista = require('../models/vistaComprador'); // Asegúrate de ajustar la ruta al modelo

const vistaCompradorController = {};

// Obtener todos los productos
vistaCompradorController.getAllProductos = (req, res) => {
    vista.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener todos los administradores
vistaCompradorController.getAllAdministradores = (req, res) => {
    vista.getAllAdministradores((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener todas las empresas
vistaCompradorController.getAllEmpresas = (req, res) => {
    vista.getAllEmpresas((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener todos los eventos
vistaCompradorController.getAllEventos = (req, res) => {
    vista.getAllEventos((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener productos con su empresa y administrador asociados
vistaCompradorController.getProductosWithEmpresaAndAdministrador = (req, res) => {
    vista.getProductosWithEmpresaAndAdministrador((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener productos por ID de empresa
vistaCompradorController.getProductosByEmpresaID = (req, res) => {
    const empresaID = req.params.empresaID;
    vista.getProductosByEmpresaID(empresaID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener empresas por ID de administrador
vistaCompradorController.getEmpresasByAdministradorID = (req, res) => {
    const adminID = req.params.adminID;
    vista.getEmpresasByAdministradorID(adminID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener producto por ID
vistaCompradorController.getProductoByID = (req, res) => {
    const productoID = req.params.productoID;
    vista.getProductoByID(productoID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Consultar administrador por ID
vistaCompradorController.getAdministradorByID = (req, res) => {
    const adminID = req.params.adminID;
    vista.getAdministradorByID(adminID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Consultar empresa por ID
vistaCompradorController.getEmpresaByID = (req, res) => {
    const empresaID = req.params.empresaID;
    vista.getEmpresaByID(empresaID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};


module.exports = vistaCompradorController;
