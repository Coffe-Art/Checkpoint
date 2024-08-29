const db = require('../utils/db');

const Administrador = {
    create: (nombre, historia, contrasena, correo_electronico, telefono, callback) => {
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
    // Método para encontrar un administrador por su correo electrónico
    findByEmail: (correo_electronico, callback) => {
        const query = 'SELECT * FROM administrador WHERE correo_electronico = ?';
        db.query(query, [correo_electronico], callback);
    },
    // Método para actualizar el token de restablecimiento
    updateResetToken: (correo_electronico, token, expiration, callback) => {
        const query = 'UPDATE administrador SET resetToken = ?, resetTokenExpiration = ? WHERE correo_electronico = ?';
        db.query(query, [token, expiration, correo_electronico], callback);
    },
    // Método para encontrar un administrador por su token de restablecimiento
    findByResetToken: (token, callback) => {
        const query = 'SELECT * FROM administrador WHERE resetToken = ? AND resetTokenExpiration > NOW()';
        db.query(query, [token], callback);
    },
    // Método para actualizar la contraseña y limpiar el token de restablecimiento
    resetPassword: (correo_electronico, newPassword, callback) => {
        const query = 'UPDATE administrador SET contrasena = ?, resetToken = NULL, resetTokenExpiration = NULL WHERE correo_electronico = ?';
        db.query(query, [newPassword, correo_electronico], callback);
    }
};

module.exports = Administrador;