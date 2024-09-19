const db = require('../utils/db'); // Asegúrate de que la conexión a la base de datos esté correctamente configurada

const Reporte = {};

// Crear un reporte
Reporte.create = (codigoempresa, motivo, callback) => {
    const query = `
        INSERT INTO reportes (codigoempresa, motivo, estado)
        VALUES (?, ?, 'pendiente')
    `;
    db.query(query, [codigoempresa, motivo], (err, result) => {
        if (err) {
            console.error('Error al guardar el reporte en la base de datos:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Obtener todos los reportes de una empresa por su código
Reporte.findByEmpresaId = (codigoempresa, callback) => {
    const query = `
        SELECT * FROM reportes
        WHERE codigoempresa = ?
    `;
    db.query(query, [codigoempresa], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Resolver un reporte (cambiar estado a 'resuelto')
Reporte.resolve = (idReporte, callback) => {
    const query = `
        UPDATE reportes
        SET estado = 'resuelto'
        WHERE idReporte = ?
    `;
    db.query(query, [idReporte], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Obtener todos los reportes (para administración)
Reporte.findAll = (callback) => {
    const query = `
        SELECT * FROM reportes
    `;
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = Reporte;
