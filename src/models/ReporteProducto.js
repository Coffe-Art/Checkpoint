const db = require('../utils/db'); // Asegúrate de que el archivo de conexión a la base de datos esté correcto

const ReporteProducto = {
    crearReporte: (idProducto, motivo, callback) => {
        const query = `INSERT INTO reportes_producto (idProducto, motivo) VALUES (?, ?)`;
        db.query(query, [idProducto, motivo], (err, results) => {
            if (err) {
                console.error('Error al crear el reporte de producto:', err);
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },

    obtenerReportes: (callback) => {
        const query = `SELECT * FROM reportes_producto`;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error al obtener reportes de productos:', err);
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },

    resolverReporte: (idReporteP, nuevoEstado, callback) => {
        const query = `UPDATE reportes_producto SET estado = ? WHERE idReporteP = ?`;
        db.query(query, [nuevoEstado, idReporteP], (err, results) => {
            if (err) {
                console.error('Error al actualizar el estado del reporte:', err);
                callback(err);
            } else {
                callback(null, results);
            }
        });
    }
};

module.exports = ReporteProducto;
