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
    checkIfExistsByEmail: (correo_electronico, callback) => {
        const query = 'CALL ThisBuyerExist(?, @p_existe)';
        db.query(query, [correo_electronico], (err, results) => {
            if (err) {
                return callback(err);
            }
            const result = results[0][0];
            callback(null, result.p_existe);
        });
    },
    findByEmail: (correo_electronico, callback) => {
        const query = 'SELECT * FROM comprador WHERE correo_electronico = ?';
        db.query(query, [correo_electronico], callback);
    },
    updateResetToken: (correo_electronico, token, expiration, callback) => {
        const query = 'UPDATE comprador SET resetToken = ?, resetTokenExpiration = ? WHERE correo_electronico = ?';
        db.query(query, [token, expiration, correo_electronico], callback);
    },
    findByResetToken: (token, callback) => {
        const query = 'SELECT * FROM comprador WHERE resetToken = ? AND resetTokenExpiration > NOW()';
        db.query(query, [token], callback);
    },
    resetPassword: (correo_electronico, newPassword, callback) => {
        const query = 'UPDATE comprador SET contrasena = ?, resetToken = NULL, resetTokenExpiration = NULL WHERE correo_electronico = ?';
        db.query(query, [newPassword, correo_electronico], callback);
    }
};

module.exports = Comprador;