// src/controllers/authController.js
require('dotenv').config(); // Carga las variables de entorno
const bcrypt = require('bcrypt');
const Administrador = require('../models/administrador');
const Comprador = require('../models/comprador');
const Empleado = require('../models/empleado');
const authService = require('../services/authService');
const resend = require('../services/resendClient'); // Importa el cliente de Resend

const sendRegistrationEmail = async (email, name, userType) => {
  try {
    await resend.emails.create({
      to: email,
      subject: `Welcome to our service, ${name}!`,
      body: `Hi ${name},\n\nThank you for registering as a ${userType}. We are excited to have you on board!\n\nBest regards,\nYour Company`,
    });
    console.log(`Registration email sent to ${email}`);
  } catch (error) {
    console.error('Error sending registration email:', error);
  }
};

const register = async (req, res) => {
  try {
    console.log("Register endpoint hit");
    const { tipoUsuario, nombre, contrasena, correo_electronico, telefono, historia, estado, permisos, idAdministrador } = req.body;

    if (!tipoUsuario || !nombre || !contrasena || !correo_electronico || !telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const tipoUsuarioLower = tipoUsuario.toLowerCase();
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    let result;
    switch (tipoUsuarioLower) {
      case 'administrador':
        const adminExists = await new Promise((resolve, reject) => {
          Administrador.checkIfExistsByEmail(correo_electronico, (err, exists) => {
            if (err) reject(err);
            else resolve(exists);
          });
        });
        if (adminExists) {
          return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }
        result = await new Promise((resolve, reject) => {
          Administrador.create(nombre, historia || null, hashedPassword, correo_electronico, telefono, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        break;
      case 'empleado':
        const empExists = await new Promise((resolve, reject) => {
          Empleado.checkIfExistsByEmail(correo_electronico, (err, exists) => {
            if (err) reject(err);
            else resolve(exists);
          });
        });
        if (empExists) {
          return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }
        result = await new Promise((resolve, reject) => {
          Empleado.create(nombre, hashedPassword, estado, telefono, permisos, correo_electronico, idAdministrador, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        break;
      case 'comprador':
        const buyerExists = await new Promise((resolve, reject) => {
          Comprador.checkIfExistsByEmail(correo_electronico, (err, exists) => {
            if (err) reject(err);
            else resolve(exists);
          });
        });
        if (buyerExists) {
          return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }
        result = await new Promise((resolve, reject) => {
          Comprador.create(nombre, hashedPassword, telefono, correo_electronico, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        break;
      default:
        return res.status(400).json({ error: 'Tipo de usuario no válido' });
    }

    // Envía el correo de bienvenida
    await sendRegistrationEmail(correo_electronico, nombre, tipoUsuarioLower);

    res.status(201).json({ message: `${tipoUsuarioLower.charAt(0).toUpperCase() + tipoUsuarioLower.slice(1)} registrado con éxito` });
  } catch (err) {
    console.error('Error en el registro:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Tu función de login queda igual
const login = async (req, res) => {
  try {
    console.log("Login endpoint hit");
    const { tipoUsuario, correo_electronico, contrasena } = req.body;

    if (!tipoUsuario || !correo_electronico || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const tipoUsuarioLower = tipoUsuario.toLowerCase();

    const token = await authService.login(tipoUsuarioLower, correo_electronico, contrasena);
    res.json({ token });
  } catch (err) {
    console.error('Error en el login:', err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { register, login };
