const db = require('../utils/db'); // Ajusta la ruta a tu archivo de conexión a la base de datos

const Producto = {};

// Obtener todos los productos
Producto.getAll = (callback) => {
    const query = `CALL GetAllProductos()`;
    db.query(query, callback);
};

// Obtener todos los administradores
Producto.getAllAdministradores = (callback) => {
    const query = `CALL GetAllAdministradores()`;
    db.query(query, callback);
};

// Obtener todas las empresas
Producto.getAllEmpresas = (callback) => {
    const query = `CALL GetAllEmpresas()`;
    db.query(query, callback);
};

// Obtener todos los eventos
Producto.getAllEventos = (callback) => {
    const query = `CALL GetAllEventos()`;
    db.query(query, callback);
};

// Obtener productos con su empresa y administrador asociados
Producto.getProductosWithEmpresaAndAdministrador = (callback) => {
    const query = `CALL GetProductosWithEmpresaAndAdministrador()`;
    db.query(query, callback);
};

// Obtener productos por ID de empresa
Producto.getProductosByEmpresaID = (empresaID, callback) => {
    const query = `CALL GetProductosByEmpresaID(?)`;
    db.query(query, [empresaID], callback);
};

// Obtener empresas por ID de administrador
Producto.getEmpresasByAdministradorID = (adminID, callback) => {
    const query = `CALL GetEmpresasByAdministradorID(?)`;
    db.query(query, [adminID], callback);
};

// Obtener producto por ID
Producto.getProductoByID = (productoID, callback) => {
    const query = `CALL GetProductoByID(?)`;
    db.query(query, [productoID], callback);
};

module.exports = Producto;
