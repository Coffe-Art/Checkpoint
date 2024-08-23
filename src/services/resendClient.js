// src/services/resendClient.js
const Resend = require('resend');

const resend = new Resend({
  apiKey: 'rnd_uc1oNSkCxKkCUuTOSbifwxl9UFE6', // Asegúrate de configurar esta variable en tu archivo .env
});

module.exports = resend;
