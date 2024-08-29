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
    },
    checkIfExistsByEmail: (correo_electronico, callback) => {
        const query = 'CALL ThisEmployerExist(?, @p_existe)';
        db.query(query, [correo_electronico], (err, results) => {
            if (err) {
                return callback(err);
            }
            const result = results[0][0];
            callback(null, result.p_existe);
        });
    },
    updateResetToken: (correo_electronico, token, expiration, callback) => {
        const query = 'UPDATE empleado SET resetToken = ?, resetTokenExpiration = ? WHERE correo_electronico = ?';
        db.query(query, [token, expiration, correo_electronico], callback);
    },
    findByResetToken: (token, callback) => {
        const query = 'SELECT * FROM empleado WHERE resetToken = ? AND resetTokenExpiration > NOW()';
        db.query(query, [token], callback);
    },
    resetPassword: (correo_electronico, newPassword, callback) => {
        const query = 'UPDATE empleado SET contrasena = ?, resetToken = NULL, resetTokenExpiration = NULL WHERE correo_electronico = ?';
        db.query(query, [newPassword, correo_electronico], callback);
    }
};

module.exports = Empleado;