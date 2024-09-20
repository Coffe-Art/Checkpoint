const pool = require('../utils/db'); // Asegúrate de tener configurado correctamente tu pool de conexión a la base de datos.

const getSalesOverviewForAdmin = async (req, res) => {
  const adminId = req.adminId; // Extraído del token o del middleware de autenticación.

  try {
    const [ventas] = await pool.query(
      `SELECT COUNT(id) as totalVentas, 
              SUM(precio_total) as totalIngresos, 
              COUNT(DISTINCT idComprador) as totalPedidos 
       FROM ventas 
       WHERE idAdministrador = ?`, [adminId]
    );
    
    res.status(200).json(ventas[0]);
  } catch (error) {
    console.error('Error al obtener el resumen de ventas:', error);
    res.status(500).json({ error: 'Error al obtener el resumen de ventas.' });
  }
};

module.exports = { getSalesOverviewForAdmin };
