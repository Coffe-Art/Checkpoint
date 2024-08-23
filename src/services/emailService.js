// src/services/emailService.js
const { EmailClient } = require("@azure/communication-email");
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const connectionString =  "endpoint=https://coffeartemails.unitedstates.communication.azure.com/;accesskey=6UFo5dwqZrtlXmSuZMFRBjwFNo8YgjMiH5EUNWoD5QEKNctFHKpVJQQJ99AHACULyCps5mg0AAAAAZCSOs7T";
const client = new EmailClient(connectionString);

const sendEmail = async (to, subject, templateName, dataTemplate) => {
    try {
        const templatePath = path.join(__dirname, '../templates', templateName);
        const source = fs.readFileSync(templatePath, 'utf-8');
        const template = Handlebars.compile(source);
        const html = template(dataTemplate);

        const emailMessage = {
            senderAddress: "DoNotReply@0b3ff4b4-b1e8-4be9-987d-d149c4a490c9.azurecomm.net",
            content: {
                subject: subject,
                html: html,
            },
            recipients: {
                to: [{ address: to }],
            },
        };

        const poller = await client.beginSend(emailMessage);
        await poller.pollUntilDone();

        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

module.exports = { sendEmail };
