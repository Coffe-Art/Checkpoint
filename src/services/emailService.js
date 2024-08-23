const { EmailClient } = require("@azure/communication-email");

const connectionString = 'endpoint=https://coffeartemails.unitedstates.communication.azure.com/;accesskey=6UFo5dwqZrtlXmSuZMFRBjwFNo8YgjMiH5EUNWoD5QEKNctFHKpVJQQJ99AHACULyCps5mg0AAAAAZCSOs7T"';
const client = new EmailClient(connectionString);

async function sendEmail(to, subject, htmlContent) {
    console.log("sendEmail called with:", { to, subject });

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
        console.log("Sending email...");
        const poller = await client.beginSend(emailMessage);
        const result = await poller.pollUntilDone();
        console.log("Email sent successfully", result);
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw error;
    }
}

module.exports = { sendEmail };
