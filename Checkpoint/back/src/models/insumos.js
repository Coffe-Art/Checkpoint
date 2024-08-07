const db = require('../utils/db');

const Insumo = {
  create: (Nombre, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, IdUsuario, callback) => {
    const query = 'CALL CreateInsumo(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [Nombre, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, IdUsuario], callback);
  },
  findById: (IdInsumo, callback) => {
    const query = 'CALL ReadInsumo(?)';
    db.query(query, [IdInsumo], callback);
  },
  update: (IdInsumo, Nombre, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, IdUsuario, callback) => {
    const query = 'CALL UpdateInsumo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [IdInsumo, Nombre, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, IdUsuario], callback);
  },
  delete: (IdInsumo, callback) => {
    const query = 'CALL DeleteInsumo(?)';
    db.query(query, [IdInsumo], callback);
  },
  findByEmpresa: (codigoempresa, callback) => {
    const query = 'CALL GetInsumosByEmpresa(?)';
    db.query(query, [codigoempresa], callback);
  }
};

module.exports = Insumo;
