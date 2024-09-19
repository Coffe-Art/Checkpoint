const Profiles = require('../models/profiles');

// Controlador para Administrador
const getAdministradorById = (req, res) => {
    const { idadministrador } = req.params;

    Profiles.findAdministradorById(idadministrador, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener Administrador' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.json(result[0]);
    });
};

const updateAdministrador = (req, res) => {
    const { idadministrador } = req.params;
    const updates = req.body;

    Profiles.updateAdministrador(idadministrador, updates, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar Administrador' });
        }
        res.json({ message: 'Administrador actualizado exitosamente' });
    });
};

// Controlador para Comprador
const getCompradorById = (req, res) => {
    const { idComprador } = req.params;

    Profiles.findCompradorById(idComprador, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener Comprador' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Comprador no encontrado' });
        }
        res.json(result[0]);
    });
};

const updateComprador = (req, res) => {
    const { idComprador } = req.params;
    const updates = req.body;

    Profiles.updateComprador(idComprador, updates, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar Comprador' });
        }
        res.json({ message: 'Comprador actualizado exitosamente' });
    });
};

module.exports = {
    getAdministradorById,
    updateAdministrador,
    getCompradorById,
    updateComprador
};
