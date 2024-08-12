require('dotenv').config(); // Carga las variables de entorno
const bcrypt = require('bcrypt');
const Administrador = require('../models/administrador');
const Comprador = require('../models/comprador');
const Empleado = require('../models/empleado');
const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        console.log("Register endpoint hit");
        const { tipoUsuario, nombre, contrasena, correo_electronico, telefono, historia, estado, permisos, idAdministrador } = req.body;

        // Validación de datos
        if (!tipoUsuario || !nombre || !contrasena || !correo_electronico || !telefono) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Convertir tipoUsuario a minúsculas
        const tipoUsuarioLower = tipoUsuario.toLowerCase();

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Verificar tipo de usuario y realizar el registro correspondiente
        let result;
        switch (tipoUsuarioLower) {
            case 'administrador':
                // Verificar si el correo ya existe
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
                // Verificar si el correo ya existe
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
                // Verificar si el correo ya existe
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

        // Validación de datos
        if (!tipoUsuario || !correo_electronico || !contrasena) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Convertir tipoUsuario a minúsculas
        const tipoUsuarioLower = tipoUsuario.toLowerCase();

        // Asegúrate de que authService esté configurado para manejar el inicio de sesión
        const token = await authService.login(tipoUsuarioLower, correo_electronico, contrasena);
        res.json({ token });
    } catch (err) {
        console.error('Error en el login:', err.message);
        res.status(400).json({ error: err.message });
    }
};

module.exports = { register, login };
