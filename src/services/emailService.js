// src/services/emailService.js
require('dotenv').config();
const { EmailClient } = require('@azure/communication-email');

// Configura tu conexión con Azure Communication Service
const connectionString = '6UFo5dwqZrtlXmSuZMFRBjwFNo8YgjMiH5EUNWoD5QEKNctFHKpVJQQJ99AHACULyCps5mg0AAAAAZCSOs7T';
const emailClient = new EmailClient(connectionString);

const sendEmail = async (to, subject, body) => {
    const message = {
        senderAddress: 'your-email@example.com', // Reemplaza con tu dirección de correo registrada en Azure
        content: {
            subject: subject,
            plainText: body,
        },
        recipients: {
            to: [{ email: to }],
        },
    };

    try {
        const response = await emailClient.send(message);
        console.log('Email enviado exitosamente, ID del mensaje:', response.messageId);
        return response;
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error.message);
        throw error;
    }
};

module.exports = { sendEmail };
