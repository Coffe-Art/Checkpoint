const Empresa = require('../models/empresa');

// Controlador para crear una empresa
exports.createEmpresa = (req, res) => {
    const { nombre, direccion, descripcion, idadministrador } = req.body;
    console.log('Datos recibidos:', nombre, direccion, descripcion, idadministrador);
    Empresa.create(nombre, direccion, descripcion, idadministrador, (err, result) => {
        if (err) {
            console.error('Error al crear empresa:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            console.log('Resultado de la creación:', result);
            res.status(200).json({ message: 'Empresa creada exitosamente', id: result[0][0].codigoempresa });
        }
    });
};

// Controlador para obtener detalles de una empresa por su código
exports.getEmpresa = (req, res) => {
    const codigoempresa = req.params.codigoempresa;
    Empresa.findById(codigoempresa, (err, empresa) => {
        if (err) {
            console.error('Error al obtener empresa:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            if (empresa && empresa.length > 0) {
                res.status(200).json(empresa[0]); // Suponiendo que el procedimiento almacenado devuelve un solo resultado
            } else {
                res.status(404).json({ error: 'Empresa no encontrada' });
            }
        }
    });
};

// Controlador para actualizar detalles de una empresa
exports.updateEmpresa = (req, res) => {
    const { codigoempresa } = req.params;
    const { nombre, direccion, descripcion, idadministrador } = req.body;
    Empresa.update(codigoempresa, nombre, direccion, descripcion, idadministrador, (err, result) => {
        if (err) {
            console.error('Error al actualizar empresa:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Empresa actualizada exitosamente' });
        }
    });
};

// Controlador para eliminar una empresa
exports.deleteEmpresa = (req, res) => {
    const codigoempresa = req.params.codigoempresa;
    Empresa.delete(codigoempresa, (err, result) => {
        if (err) {
            console.error('Error al eliminar empresa:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Empresa eliminada exitosamente' });
        }
    });
};

// Controlador para obtener todas las empresas creadas por un administrador específico
exports.getEmpresasByAdmin = (req, res) => {
    const idadministrador = req.params.idadministrador;
    Empresa.findByAdminId(idadministrador, (err, empresas) => {
        if (err) {
            console.error('Error al obtener empresas:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            if (empresas && empresas.length > 0) {
                res.status(200).json(empresas);
            } else {
                res.status(404).json({ error: 'No se encontraron empresas para este administrador' });
            }
        }
    });
};

// Los siguientes métodos de vinculación y desvinculación han sido eliminados,
// ya que los procedimientos almacenados correspondientes no están definidos en el modelo.

