require('dotenv').config(); // Carga las variables de entorno
const bcrypt = require('bcrypt');
const Administrador = require('../models/administrador');
const Comprador = require('../models/comprador');
const Empleado = require('../models/empleado');
const authService = require('../services/authService');
const { sendEmail } = require('../services/emailService'); // Importar la función de envío de correos

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
                result = await new Promise((resolve, reject) => {
                    Administrador.create(nombre, historia || null, hashedPassword, correo_electronico, telefono, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                break;
            case 'empleado':
                result = await new Promise((resolve, reject) => {
                    Empleado.create(nombre, hashedPassword, estado, telefono, permisos, correo_electronico, idAdministrador, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                break;
            case 'comprador':
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

        // Enviar correo de registro después de la creación exitosa del usuario
        const subject = `Cuenta Creada: Bienvenido a Coffe Art`;
        const text = `Hola ${nombre},\n\nGracias por registrarte como ${tipoUsuarioLower} en Coffe Art.`;
        const html = `<b>Hola ${nombre},</b><br><br>Gracias por registrarte como ${tipoUsuarioLower} en Coffe Art.`;
        await sendEmail(correo_electronico, subject, text, html);

        res.status(201).json({ message: `${tipoUsuarioLower.charAt(0).toUpperCase() + tipoUsuarioLower.slice(1)} registrado con éxito` });
    } catch (err) {
        console.error('Error en el registro:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Función de login
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
