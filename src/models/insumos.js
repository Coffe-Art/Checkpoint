const db = require('../utils/db');

const Insumo = {
  create: (Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, callback) => {
    const query = 'CALL CreateInsumo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa], callback);
  },
  findById: (IdInsumo, callback) => {
    const query = 'CALL ReadInsumo(?)';
    db.query(query, [IdInsumo], callback);
  },
  update: (IdInsumo, Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, callback) => {
    const query = 'CALL UpdateInsumo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [IdInsumo, Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa], callback);
  },
  delete: (IdInsumo, callback) => {
    const query = 'CALL DeleteInsumo(?)';
    db.query(query, [IdInsumo], callback);
  },
  findByEmpresa: (codigoEmpresa, callback) => {
    const query = 'CALL GetInsumosByEmpresa(?)';
    db.query(query, [codigoEmpresa], callback);
  }
};

module.exports = Insumo;

