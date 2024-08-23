// src/services/emailService.js
const { EmailClient } = require("@azure/communication-email");

// Recupera la cadena de conexión de las variables de entorno
const connectionString = 'endpoint=https://coffeartemails.unitedstates.communication.azure.com/;accesskey=6UFo5dwqZrtlXmSuZMFRBjwFNo8YgjMiH5EUNWoD5QEKNctFHKpVJQQJ99AHACULyCps5mg0AAAAAZCSOs7T"';
const client = new EmailClient(connectionString);

async function sendEmail(to, subject, htmlContent) {
    const emailMessage = {
        senderAddress: "DoNotReply@0b3ff4b4-b1e8-4be9-987d-d149c4a490c9.azurecomm.net",
        content: {
            subject: subject,
            html: htmlContent,
        },
        recipients: {
            to: [{ address: to }],
        },
    };

    try {
        const poller = await client.beginSend(emailMessage);
        const result = await poller.pollUntilDone();
        console.log("Email sent successfully", result);
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw error;
    }
}

module.exports = { sendEmail };
