const db = require('../utils/db');

const Profiles = {
    // Métodos para Administrador
    findAdministradorById: (idadministrador, callback) => {
        const query = 'CALL GetAdministradorById(?)';
        db.query(query, [idadministrador], callback);
    },
    updateAdministrador: (idadministrador, updates, callback) => {
        const query = 'CALL UpdateAdministrador(?, ?, ?, ?, ?, ?)';
        db.query(query, [
            idadministrador,
            updates.nombre,
            updates.historia || null,
            updates.contrasena,
            updates.correo_electronico,
            updates.telefono
        ], callback);
    },

    // Métodos para Comprador
    findCompradorById: (idComprador, callback) => {
        const query = 'CALL GetCompradorById(?)';
        db.query(query, [idComprador], callback);
    },
    updateComprador: (idComprador, updates, callback) => {
        const query = 'CALL UpdateComprador(?, ?, ?, ?, ?)';
        db.query(query, [
            idComprador,
            updates.nombre,
            updates.contrasena,
            updates.telefono,
            updates.correo_electronico
        ], callback);
    }
};

module.exports = Profiles;
