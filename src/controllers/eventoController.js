const Evento = require('../models/evento');

// Controlador para crear un evento
exports.createEvento = (req, res) => {
  const { nombreEvento, fecha, ubicacion, empresasAsistente, duracion, lugar, descripcion, idAdministrador } = req.body;
  Evento.createEvento(nombreEvento, fecha, ubicacion, empresasAsistente, duracion, lugar, descripcion, idAdministrador,  (err, result) => {
    if (err) {
      console.error('Error al crear evento:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(201).json({ message: 'Evento creado exitosamente' });
    }
  });
};

// Controlador para obtener todos los eventos
exports.getAllEventos = (req, res) => {
  Evento.getAllEventos((err, eventos) => {
    if (err) {
      console.error('Error al obtener eventos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json(eventos);
    }
  });
};

// Controlador para obtener un evento por ID
exports.getEventoById = (req, res) => {
  const idEvento = req.params.idEvento;
  Evento.getEventoById(idEvento, (err, evento) => {
    if (err) {
      console.error('Error al obtener evento:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (evento.length > 0) {
        res.status(200).json(evento[0]);
      } else {
        res.status(404).json({ error: 'Evento no encontrado' });
      }
    }
  });
};

// Controlador para actualizar un evento
exports.updateEvento = (req, res) => {
  const idEvento = req.params.idEvento;
  const { nombreEvento, fecha, ubicacion, empresasAsistente, duracion, lugar, descripcion } = req.body;

  if (!idEvento || !nombreEvento || !ubicacion || !empresasAsistente || !duracion || !lugar || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos necesarios para actualizar el evento' });
  }

  Evento.updateEvento(idEvento, nombreEvento, fecha, ubicacion, empresasAsistente, duracion, lugar, descripcion, (err, result) => {
    if (err) {
      console.error('Error al actualizar evento:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ message: 'Evento actualizado exitosamente' });
    }
  });
};

// Controlador para eliminar un evento
exports.deleteEvento = (req, res) => {
  const idEvento = req.params.idEvento;
  Evento.deleteEvento(idEvento, (err, result) => {
    if (err) {
      console.error('Error al eliminar evento:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ message: 'Evento eliminado exitosamente' });
    }
  });
};

// Controlador para obtener eventos por ID de administrador
exports.getEventosPorAdministrador = (req, res) => {
  const idAdministrador = req.params.idAdministrador;
  Evento.getEventosPorAdministrador(idAdministrador, (err, eventos) => {
    if (err) {
      console.error('Error al obtener eventos por administrador:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json(eventos);
    }
  });
};



