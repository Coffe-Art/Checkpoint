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
    }
};

module.exports = Comprador;
