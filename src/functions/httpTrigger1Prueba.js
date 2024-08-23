const { app } = require('@azure/functions');
const Handlebars = require('handlebars');
const { EmailClient } = require("@azure/communication-email");
const fs = require('fs');
const path = require('path');
const connectionString = "endpoint=https://coffeartemails.unitedstates.communication.azure.com/;accesskey=6UFo5dwqZrtlXmSuZMFRBjwFNo8YgjMiH5EUNWoD5QEKNctFHKpVJQQJ99AHACULyCps5mg0AAAAAZCSOs7T";
const client = new EmailClient(connectionString);
app.http('httpTrigger1', {
methods: ['POST'],
handler: async (request, context) => {
const requestData = await request.json();
const subject = requestData.subject;
const templateName = requestData.template;
const dataTemplate = requestData.dataTemplate;
const to = requestData.to;
const templatePath = path.join(__dirname, templateName);
const source = fs.readFileSync(templatePath, 'utf-8');
const template = Handlebars.compile(source);
const html = template({ name: dataTemplate.name });
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
const result = await poller.pollUntilDone();
return { body: `email sent successfully` };
}
});