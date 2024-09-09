const { Router } = require("express");
const mercadopago = require("mercadopago");

const paymentRoutes = Router();

// Configura Mercado Pago con tu token de acceso directamente en el código
mercadopago.configure({
  access_token: 'TEST-3363566471887668-090715-1ed073560ef1fa94870c5ade342255eb-1980741812' // Reemplaza con tu token de acceso
});

paymentRoutes.post("/preference", async (req, res) => {
  const productos = req.body;

  // Validar que los productos sean válidos
  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'Debe enviar una lista de productos.' });
  }

  const items = productos.map(producto => {
    if (typeof producto.nombre !== 'string' || !producto.nombre.trim()) {
      throw new Error('El nombre del producto es obligatorio y debe ser una cadena no vacía.');
    }
    
    if (isNaN(producto.precio) || producto.precio <= 0) {
      throw new Error('El precio debe ser un número mayor a 0.');
    }

    if (isNaN(producto.cantidad) || producto.cantidad <= 0) {
      throw new Error('La cantidad debe ser un número mayor a 0.');
    }

    return {
      title: producto.nombre,
      unit_price: parseFloat(producto.precio),
      currency_id: "COP",
      quantity: parseInt(producto.cantidad, 10),
    };
  });

  try {
    const preference = {
      items,
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
    };

    const respuesta = await mercadopago.preferences.create(preference);
    res.status(200).json({ preferenceId: respuesta.body.id });
  } catch (error) {
    console.error('Error al crear la preferencia de pago:', error.response ? error.response : error.message);
    res.status(500).json({ error: 'Error al crear la preferencia de pago' });
  }
});

module.exports = paymentRoutes;