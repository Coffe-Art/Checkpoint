const pool = require('../utils/db'); // Asegúrate de que esta ruta sea correcta

// Función para crear un evento
const createEvento = (nombreEvento, fecha, ubicacion, empresasAsistente, duracion, lugar, descripcion, idAdministrador, callback) => {
  pool.query('CALL CrearEvento(?, ?, ?, ?, ?, ?, ?, ?)', 
    [nombreEvento, fecha, ubicacion, empresasAsistente, duracion, lugar, descripcion, idAdministrador],
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};


// Función para obtener todos los eventos
const getAllEventos = (callback) => {
  pool.query('CALL ObtenerEventos()', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]); // Suponiendo que el primer resultado contiene los datos
  });
};

// Función para obtener un evento por ID
const getEventoById = (idEvento, callback) => {
  pool.query('CALL ObtenerEventoPorId(?)', [idEvento], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]); // Suponiendo que el primer resultado contiene los datos
  });
};

// Función para actualizar un evento
const updateEvento = (idEvento, nombreEvento, fecha, ubicacion, empresasAsistente, duracion, lugar, descripcion, callback) => {
  pool.query('CALL ActualizarEvento(?, ?, ?, ?, ?, ?, ?, ?)', 
    [idEvento, nombreEvento, fecha, ubicacion, empresasAsistente, duracion, lugar, descripcion],
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

// Función para eliminar un evento
const deleteEvento = (idEvento, callback) => {
  pool.query('CALL EliminarEvento(?)', [idEvento], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Función para obtener eventos por ID de administrador
const getEventosPorAdministrador = (idAdministrador, callback) => {
  pool.query('CALL ObtenerEventosPorAdministrador(?)', [idAdministrador], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]); // Ajusta según la estructura de tu resultado
  });
};

module.exports = {
  createEvento,
  getAllEventos,
  getEventoById,
  updateEvento,
  deleteEvento,
  getEventosPorAdministrador
};
