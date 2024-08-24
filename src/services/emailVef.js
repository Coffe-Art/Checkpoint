// emailService.js

const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar variables de entorno

// Configura el transportador con tus credenciales de correo
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Cambia por el servidor SMTP que utilices
  port: 587, // o 465 para SSL
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: 'coffeart224@gmail.com', // Usar variable de entorno
    pass: 'Adso2696224' // Usar variable de entorno
  }
});

// Función para enviar correos
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Coffe Art" <coffeart224@gmail.com>', // Cambia el nombre y el correo del remitente
      to: to, // Correo del destinatario
      subject: subject, // Asunto del correo
      text: text, // Contenido en texto plano del correo
      html: html // Contenido en HTML del correo (opcional)
    });

    console.log('Correo enviado: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error al enviar el correo: ', error);
    throw error;
  }
};

module.exports = { sendEmail };
