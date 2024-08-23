require('dotenv').config();
const { EmailClient } = require('@azure/communication-email');

// Configuración de la cadena de conexión desde variables de entorno
const connectionString = 'endpoint=https://coffeartemails.unitedstates.communication.azure.com/;accesskey=6UFo5dwqZrtlXmSuZMFRBjwFNo8YgjMiH5EUNWoD5QEKNctFHKpVJQQJ99AHACULyCps5mg0AAAAAZCSOs7T'; // Asegúrate de definir esta variable en tu archivo .env
console.log('Connection String:', connectionString);

const emailClient = new EmailClient(connectionString);

const sendEmail = async (to, subject, htmlContent) => {
    const message = {
        senderAddress: 'DoNotReply@0b3ff4b4-b1e8-4be9-987d-d149c4a490c9.azurecomm.net', // Usa una variable de entorno para la dirección del remitente
        content: {
            subject: "Se ha creado su cuenta",
            html: "<html><h1>¡Bienvenido a Coffe Art!</h1l></html>",
            plainText: "¡Bienvenido a Coffe Art!", // Extrae texto plano del HTML
        },
        recipients: {
            to: [{ email: to }],
        },
    };

    console.log('Mensaje a enviar:', JSON.stringify(message, null, 2)); // Log del mensaje a enviar

    try {
        const response = await emailClient.send(message);
        console.log('Email enviado exitosamente, ID del mensaje:', response.messageId);
        console.log('Detalles de la respuesta:', JSON.stringify(response, null, 2)); // Log de la respuesta del envío
        return response;
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error.message);
        console.error('Detalles del error:', JSON.stringify(error, null, 2)); // Log del detalle del error
        throw error;
    }
};

module.exports = { sendEmail };
