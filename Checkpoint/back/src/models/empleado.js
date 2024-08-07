// src/models/empleado.js
const db = require('../utils/db');

const Empleado = {
    create: (nombre, contrasena, estado, telefono, permisos, correo_electronico, idAdministrador, callback) => {
        const query = 'CALL CreateEmpleado(?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [nombre, contrasena, estado, telefono, permisos, correo_electronico, idAdministrador], callback);
    },
    update: (idempleado, contrasena, nombre, estado, telefono, permisos, correo_electronico, idAdministrador, callback) => {
        const query = 'CALL UpdateEmpleado(?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [idempleado, contrasena, nombre, estado, telefono, permisos, correo_electronico, idAdministrador], callback);
    },
    findByEmail: (correo_electronico, callback) => {
        const query = 'SELECT * FROM empleado WHERE correo_electronico = ?';
        db.query(query, [correo_electronico], callback);
    }
};

module.exports = Empleado;
