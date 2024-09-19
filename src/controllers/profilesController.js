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
    const { nombre, correo_electronico, telefono } = req.body;

    // Verificar si todos los campos necesarios están presentes
    if (!nombre || !correo_electronico || !telefono) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    Profiles.updateAdministrador(idadministrador, { nombre, correo_electronico, telefono }, (err, result) => {
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
    const { nombre, correo_electronico, telefono } = req.body;

    // Verificar si todos los campos necesarios están presentes
    if (!nombre || !correo_electronico || !telefono) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    Profiles.updateComprador(idComprador, { nombre, correo_electronico, telefono }, (err, result) => {
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
