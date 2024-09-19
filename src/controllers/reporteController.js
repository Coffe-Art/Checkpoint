const Reporte = require('../models/reporte'); // Asegúrate de que el path sea correcto

// Controlador para reportar una empresa por un comprador
exports.reportEmpresa = async (req, res) => {
    const { codigoempresa, motivo } = req.body;

    // Validar los datos recibidos
    if (!codigoempresa || !motivo) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Llamar a la función del modelo para crear el reporte
    Reporte.create(codigoempresa, motivo, (err, result) => {
        if (err) {
            console.error('Error al guardar el reporte en la base de datos:', err);
            return res.status(500).json({ message: 'Error al guardar el reporte' });
        }
        // Responder con un mensaje de éxito
        res.status(201).json({ message: 'Reporte recibido correctamente' });
    });
};

// Controlador para obtener todos los reportes de una empresa por su código
exports.getReportesByEmpresa = (req, res) => {
    const codigoempresa = req.params.codigoempresa;

    // Validar que se haya enviado el código de la empresa
    if (!codigoempresa) {
        return res.status(400).json({ error: 'El código de la empresa es obligatorio' });
    }

    // Llamada al modelo para obtener los reportes de una empresa
    Reporte.findByEmpresaId(codigoempresa, (err, reportes) => {
        if (err) {
            console.error('Error al obtener reportes:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (reportes && reportes.length > 0) {
            res.status(200).json(reportes);
        } else {
            res.status(404).json({ error: 'No se encontraron reportes para esta empresa' });
        }
    });
};

// Controlador para resolver un reporte (cambiar estado a 'resuelto')
exports.resolveReporte = (req, res) => {
    const idReporte = req.params.idReporte;

    // Validar que se haya enviado el ID del reporte
    if (!idReporte) {
        return res.status(400).json({ error: 'El ID del reporte es obligatorio' });
    }

    // Llamada al modelo para resolver el reporte
    Reporte.resolve(idReporte, (err, result) => {
        if (err) {
            console.error('Error al resolver reporte:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reporte no encontrado' });
        }
        res.status(200).json({ message: 'Reporte resuelto exitosamente' });
    });
};

// Controlador para obtener todos los reportes de todas las empresas (para administración)
exports.getAllReportes = (req, res) => {
    Reporte.findAll((err, reportes) => {
        if (err) {
            console.error('Error al obtener reportes:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (reportes && reportes.length > 0) {
            res.status(200).json(reportes);
        } else {
            res.status(404).json({ error: 'No se encontraron reportes' });
        }
    });
};
