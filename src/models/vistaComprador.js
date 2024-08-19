const db = require('../utils/db'); // Ajusta la ruta a tu archivo de conexión a la base de datos

const vistaComprador = {};

// Obtener todos los productos
vistaComprador.getAll = (callback) => {
    const query = `CALL GetAllProductos()`;
    db.query(query, callback);
};

// Obtener todos los administradores
vistaComprador.getAllAdministradores = (callback) => {
    const query = `CALL GetAllAdministradores()`;
    db.query(query, callback);
};

// Obtener todas las empresas
vistaComprador.getAllEmpresas = (callback) => {
    const query = `CALL GetAllEmpresas()`;
    db.query(query, callback);
};

// Obtener todos los eventos
vistaComprador.getAllEventos = (callback) => {
    const query = `CALL GetAllEventos()`;
    db.query(query, callback);
};

// Obtener productos con su empresa y administrador asociados
vistaComprador.getProductosWithEmpresaAndAdministrador = (callback) => {
    const query = `CALL GetProductosWithEmpresaAndAdministrador()`;
    db.query(query, callback);
};

// Obtener productos por ID de empresa
vistaComprador.getProductosByEmpresaID = (empresaID, callback) => {
    const query = `CALL GetProductosByEmpresaID(?)`;
    db.query(query, [empresaID], callback);
};

// Obtener empresas por ID de administrador
vistaComprador.getEmpresasByAdministradorID = (adminID, callback) => {
    const query = `CALL GetEmpresasByAdministradorID(?)`;
    db.query(query, [adminID], callback);
};

// Obtener producto por ID
vistaComprador.getProductoByID = (productoID, callback) => {
    const query = `CALL GetProductoByID(?)`;
    db.query(query, [productoID], callback);
};

// Consultar administrador por ID
vistaComprador.getAdministradorByID = (adminID, callback) => {
    const query = `CALL ConsultarAdministradorPorId(?)`;
    db.query(query, [adminID], callback);
};

// Consultar empresa por ID
vistaComprador.getEmpresaByID = (empresaID, callback) => {
    const query = `CALL ConsultarEmpresaPorId(?)`;
    db.query(query, [empresaID], callback);
};

module.exports = vistaComprador;
