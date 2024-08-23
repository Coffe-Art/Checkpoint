// src/services/resendClient.js
require('dotenv').config();
const { Resend } = require('resend'); // Import Resend class from 'resend'

// Initialize Resend client with the API key from environment variables
const resend = new Resend('rnd_uc1oNSkCxKkCUuTOSbifwxl9UFE6'); 

module.exports = resend;
