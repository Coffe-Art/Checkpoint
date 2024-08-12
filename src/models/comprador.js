// src/models/comprador.js
const db = require('../utils/db');

const Comprador = {
    create: (nombre, contrasena, telefono, correo_electronico, callback) => {
        const query = 'CALL CreateComprador(?, ?, ?, ?)';
        db.query(query, [nombre, contrasena, telefono, correo_electronico], callback);
    },
    deleteById: (idComprador, callback) => {
        const query = 'CALL DeleteComprador(?)';
        db.query(query, [idComprador], callback);
    },
    findById: (idComprador, callback) => {
        const query = 'CALL ReadComprador(?)';
        db.query(query, [idComprador], callback);
    },
    update: (idComprador, updates, callback) => {
        const query = 'CALL UpdateComprador(?, ?, ?, ?, ?)';
        db.query(query, [idComprador, updates.nombre, updates.contrasena, updates.telefono, updates.correo_electronico], callback);
    },
    // Nuevo método para verificar si el comprador existe por correo electrónico
    checkIfExistsByEmail: (correo_electronico, callback) => {
        const query = 'CALL ThisBuyerExist(?, @p_existe)';
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

module.exports = Comprador;
