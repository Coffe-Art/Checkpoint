require('dotenv').config();
const { EmailClient } = require('@azure/communication-email');

const connectionString = 'endpoint=https://coffeartemails.unitedstates.communication.azure.com/;accesskey=6UFo5dwqZrtlXmSuZMFRBjwFNo8YgjMiH5EUNWoD5QEKNctFHKpVJQQJ99AHACULyCps5mg0AAAAAZCSOs7T';
const emailClient = new EmailClient(connectionString);

const sendEmail = async (to) => {
    const message = {
        senderAddress: 'DoNotReply@0b3ff4b4-b1e8-4be9-987d-d149c4a490c9.azurecomm.net',
        content: {
            subject: 'Correo electrónico de prueba',
            html: '<html><h1>Hola mundo por correo electrónico.</h1></html>',
            plainText: 'Hola mundo por correo electrónico',
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
