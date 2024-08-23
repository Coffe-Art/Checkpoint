

require('dotenv').config();
const { EmailClient } = require('@azure/communication-email');

const connectionString =  'endpoint=https://coffeartemails.unitedstates.communication.azure.com/;accesskey=6UFo5dwqZrtlXmSuZMFRBjwFNo8YgjMiH5EUNWoD5QEKNctFHKpVJQQJ99AHACULyCps5mg0AAAAAZCSOs7T'; // Usa variables de entorno
const emailClient = new EmailClient(connectionString);

const sendEmail = async (to, subject, htmlContent) => {
    const message = {
        senderAddress: process.env.SENDER_EMAIL_ADDRESS, // Usa una variable de entorno para la dirección del remitente
        content: {
            subject: subject,
            html: htmlContent,
            plainText: htmlContent.replace(/<\/?[^>]+>/gi, ''), // Extrae texto plano del HTML
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

