// sendTestEmail.js

const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar variables de entorno

// Configura el transportador con tus credenciales de correo
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: 'coffeart224@gmail.com', // Usar variable de entorno
    pass: 'ijkm tiqe jduz jakn' // Usar variable de entorno
  },
  debug: true, // Habilitar depuración
  logger: true // Habilitar registro
});

// Enviar un correo de prueba
const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"Coffe Art" <coffeart224@gmail.com>', // Remitente
      to: 'mariangelql1129@gmail.com', // Destinatario
      subject: 'Correo de Prueba', // Asunto del correo
      text: 'Este es un correo de prueba', // Texto del correo
      html: '<b>Este es un correo de prueba</b>' // HTML del correo
    });

    console.log('Correo enviado: %s', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo: ', error);
  }
};

sendTestEmail();
