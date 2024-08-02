const db = require('../utils/db');

const Producto = {
  create: (materiales, nombre, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa, callback) => {
    const query = 'CALL CreateProducto(?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [materiales, nombre, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa], callback);
  },
  findById: (idProducto, callback) => {
    const query = 'CALL ReadProducto(?)';
    db.query(query, [idProducto], callback);
  },
  update: (idProducto, materiales, nombre, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa, callback) => {
    const query = 'CALL UpdateProducto(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [idProducto, materiales, nombre, precio, descripcion, urlProductoImg, cantidad, publicadoPor, codigoempresa], callback);
  },
  delete: (idProducto, callback) => {
    const query = 'CALL DeleteProducto(?)';
    db.query(query, [idProducto], callback);
  }
};

module.exports = Producto;
