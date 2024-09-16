const Insumo = require('../models/insumos');



exports.create = (Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, idAdministrador, callback) => {
    // Imprime los datos para asegurarte de que se están pasando correctamente
    console.log('Datos en el modelo:', { Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, idAdministrador });

    // Definir la consulta y los valores
    const query = 'CALL CreateInsumo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, idAdministrador];

    // Ejecutar la consulta
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error al llamar al procedimiento almacenado:', err);
            return callback(err, null);
        }

        // Verificar el formato de los resultados
        console.log('Resultados del procedimiento almacenado:', results);

        // El resultado puede variar dependiendo de la base de datos y el procedimiento almacenado
        // Si estás usando MySQL, el primer elemento de 'results' puede contener los resultados del procedimiento almacenado
        callback(null, results[0]);
    });
};

// Controlador para obtener detalles de un insumo por su ID
exports.getInsumo = (req, res) => {
    const idInsumo = req.params.idInsumo;
    Insumo.findById(idInsumo, (err, insumo) => {
        if (err) {
            console.error('Error al obtener insumo:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            if (insumo && insumo.length > 0) {
                res.status(200).json(insumo[0]);
            } else {
                res.status(404).json({ error: 'Insumo no encontrado' });
            }
        }
    });
};

// Controlador para actualizar un insumo existente
exports.updateInsumo = (req, res) => {
    const idInsumo = req.params.idInsumo;
    const { Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, idAdministrador } = req.body;

    Insumo.update(idInsumo, Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, idAdministrador, (err, result) => {
        if (err) {
            console.error('Error al actualizar insumo:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Insumo actualizado exitosamente' });
        }
    });
};

// Controlador para eliminar un insumo
exports.deleteInsumo = (req, res) => {
    const idInsumo = req.params.idInsumo;
    Insumo.delete(idInsumo, (err, result) => {
        if (err) {
            console.error('Error al eliminar insumo:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Insumo eliminado exitosamente' });
        }
    });
};

// Controlador para obtener todos los insumos de una empresa específica
exports.getInsumosByEmpresa = (req, res) => {
    const codigoEmpresa = req.params.codigoEmpresa;
    Insumo.findByEmpresa(codigoEmpresa, (err, insumos) => {
        if (err) {
            console.error('Error al obtener insumos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json(insumos);
        }
    });
};

// Controlador para obtener todos los insumos de un administrador específico
exports.getInsumosByAdministrador = (req, res) => {
    const idAdministrador = req.params.idAdministrador;
    Insumo.findByAdministrador(idAdministrador, (err, insumos) => {
        if (err) {
            console.error('Error al obtener insumos por administrador:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json(insumos);
        }
    });
};
