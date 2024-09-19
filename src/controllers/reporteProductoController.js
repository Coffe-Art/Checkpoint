const ReporteProducto = require('../models/ReporteProducto');

exports.crearReporte = (req, res) => {
    const { idProducto, motivo } = req.body;
    if (!idProducto || !motivo) {
        return res.status(400).json({ message: 'Faltan datos necesarios (idProducto, motivo)' });
    }

    ReporteProducto.crearReporte(idProducto, motivo, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el reporte' });
        }
        return res.status(201).json({ message: 'Reporte creado exitosamente', reporte: results });
    });
};

exports.obtenerReportes = (req, res) => {
    ReporteProducto.obtenerReportes((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los reportes' });
        }
        return res.status(200).json(results);
    });
};

exports.resolverReporte = (req, res) => {
    const { idReporteP } = req.params;
    const { estado } = req.body;
    
    if (!estado || !idReporteP) {
        return res.status(400).json({ message: 'Faltan datos necesarios (estado, idReporteP)' });
    }

    ReporteProducto.resolverReporte(idReporteP, estado, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al resolver el reporte' });
        }
        return res.status(200).json({ message: 'Reporte resuelto exitosamente' });
    });
};
