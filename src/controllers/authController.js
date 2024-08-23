require('dotenv').config(); 
const bcrypt = require('bcrypt');
const Administrador = require('../models/administrador');
const Comprador = require('../models/comprador');
const Empleado = require('../models/empleado');
const authService = require('../services/authService');
const { sendEmail } = require('../services/emailService');

const register = async (req, res) => {
    try {
        console.log("Register endpoint hit");
        const { tipoUsuario, nombre, contrasena, correo_electronico, telefono, historia, estado, permisos, idAdministrador } = req.body;
        console.log("Request body:", req.body);

        if (!tipoUsuario || !nombre || !contrasena || !correo_electronico || !telefono) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const tipoUsuarioLower = tipoUsuario.toLowerCase();
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        console.log("Hashed password generated");

        let result;
        switch (tipoUsuarioLower) {
            case 'administrador':
                console.log("Checking if administrador exists");
                const adminExists = await new Promise((resolve, reject) => {
                    Administrador.checkIfExistsByEmail(correo_electronico, (err, exists) => {
                        if (err) reject(err);
                        else resolve(exists);
                    });
                });
                if (adminExists) {
                    return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
                }
                console.log("Creating administrador");
                result = await new Promise((resolve, reject) => {
                    Administrador.create(nombre, historia || null, hashedPassword, correo_electronico, telefono, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                break;
            case 'empleado':
                console.log("Checking if empleado exists");
                const empExists = await new Promise((resolve, reject) => {
                    Empleado.checkIfExistsByEmail(correo_electronico, (err, exists) => {
                        if (err) reject(err);
                        else resolve(exists);
                    });
                });
                if (empExists) {
                    return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
                }
                console.log("Creating empleado");
                result = await new Promise((resolve, reject) => {
                    Empleado.create(nombre, hashedPassword, estado, telefono, permisos, correo_electronico, idAdministrador, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                break;
            case 'comprador':
                console.log("Checking if comprador exists");
                const buyerExists = await new Promise((resolve, reject) => {
                    Comprador.checkIfExistsByEmail(correo_electronico, (err, exists) => {
                        if (err) reject(err);
                        else resolve(exists);
                    });
                });
                if (buyerExists) {
                    return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
                }
                console.log("Creating comprador");
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

        console.log("Sending welcome email");
        await sendEmail(
            correo_electronico,
            'Bienvenido a CoffeArt',
            `<html><h1>Hola ${nombre}, ¡Gracias por registrarte en CoffeArt!</h1></html>`
        );

        res.status(201).json({ message: `${tipoUsuarioLower.charAt(0).toUpperCase() + tipoUsuarioLower.slice(1)} registrado con éxito` });
    } catch (err) {
        console.error('Error en el registro:', err.message);
        res.status(500).json({ error: err.message });
    }
};

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
