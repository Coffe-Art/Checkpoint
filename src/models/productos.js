const db = require('../utils/db'); // Asegúrate de ajustar la ruta a tu archivo de conexión a la base de datos

const Producto = {};

// Crear producto
Producto.create = (materiales, nombre, categoria, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa, idAdministrador, callback) => {
    const query = `CALL CreateProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [materiales, nombre, categoria, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa, idAdministrador];
    db.query(query, values, callback);
};

// Obtener producto por ID
Producto.findById = (idProducto, callback) => {
    const query = `SELECT * FROM productos WHERE idProducto = ?`;
    db.query(query, [idProducto], callback);
};

// Obtener productos por idAdministrador
Producto.findByIdAdministrador = (idAdministrador, callback) => {
    const query = `CALL GetProductosByIdAdministrador(?)`;
    db.query(query, [idAdministrador], callback);
};

// Obtener productos por codigoEmpresa
Producto.findByCodigoEmpresa = (codigoempresa, callback) => {
    const query = `CALL GetProductosByCodigoEmpresa(?)`;
    db.query(query, [codigoempresa], callback);
};

// Actualizar producto
Producto.update = (idProducto, materiales, nombre, categoria, precio, descripcion, cantidad, publicadoPor, codigoempresa, idAdministrador, callback) => {
    const query = `CALL UpdateProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [idProducto, materiales, nombre, categoria, precio, descripcion, cantidad, publicadoPor, codigoempresa, idAdministrador];
    db.query(query, values, callback);
};

// Eliminar producto
Producto.delete = (idProducto, callback) => {
    const query = `DELETE FROM productos WHERE idProducto = ?`;
    db.query(query, [idProducto], callback);
};

module.exports = Producto;
