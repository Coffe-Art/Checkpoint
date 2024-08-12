// src/models/administrador.js
const db = require('../utils/db');

const Administrador = {
    create: (nombre, historia, contrasena, correo_electronico, telefono, callback) => {
        // Cambiar la consulta para que `historia` pueda ser NULL
        const query = 'CALL CreateAdministrador(?, ?, ?, ?, ?)';
        db.query(query, [nombre, historia || null, contrasena, correo_electronico, telefono], callback);
    },
    deleteById: (idadministrador, callback) => {
        const query = 'CALL DeleteAdministrador(?)';
        db.query(query, [idadministrador], callback);
    },
    findById: (idadministrador, callback) => {
        const query = 'CALL ReadAdministrador(?)';
        db.query(query, [idadministrador], callback);
    },
    update: (idadministrador, updates, callback) => {
        const query = 'CALL UpdateAdministrador(?, ?, ?, ?, ?, ?)';
        db.query(query, [idadministrador, updates.nombre, updates.historia, updates.contrasena, updates.correo_electronico, updates.telefono], callback);
    },
    // Nuevo método para verificar si el administrador existe por correo electrónico
    checkIfExistsByEmail: (correo_electronico, callback) => {
        const query = 'CALL ThisAdminExist(?, @p_existe)';
        db.query(query, [correo_electronico], (err, results) => {
            if (err) {
                return callback(err);
            }
            // Obtener el valor del parámetro de salida
            const result = results[0][0];
            callback(null, result.p_existe);
        });
    }
};

module.exports = Administrador;
