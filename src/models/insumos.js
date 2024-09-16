const db = require('../utils/db');

const Insumo = {
  create: (Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, idAdministrador, callback) => {
    const query = 'CALL CreateInsumo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, idAdministrador], callback);
  },
  
  findById: (IdInsumo, callback) => {
    const query = 'CALL GetInsumoById(?)';
    db.query(query, [IdInsumo], callback);
  },
  
  update: (IdInsumo, Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, idAdministrador, callback) => {
    const query = 'CALL UpdateInsumo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [IdInsumo, Nombre, cantidadInsumo, precioUnitario, precioPorKilo, descripcion, lugarDeVenta, correoContacto, TelefonoContacto, TipoDeVenta, codigoEmpresa, idAdministrador], callback);
  },
  
  delete: (IdInsumo, callback) => {
    const query = 'CALL DeleteInsumo(?)';
    db.query(query, [IdInsumo], callback);
  },
  
  findByEmpresa: (codigoEmpresa, callback) => {
    const query = 'CALL GetInsumosByCodigoEmpresa(?)';
    db.query(query, [codigoEmpresa], callback);
  },
  
  findByAdministrador: (idAdministrador, callback) => {
    const query = 'CALL GetInsumosByAdministrador(?)';
    db.query(query, [idAdministrador], callback);
  }
};

module.exports = Insumo;
