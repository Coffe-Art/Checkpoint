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

        // Verificar si el correo electrónico ya está en uso
        let exists;
        switch (tipoUsuarioLower) {
            case 'administrador':
                exists = await Administrador.checkIfExistsByEmail(correo_electronico);
                break;
            case 'empleado':
                exists = await Empleado.checkIfExistsByEmail(correo_electronico);
                break;
            case 'comprador':
                exists = await Comprador.checkIfExistsByEmail(correo_electronico);
                break;
            default:
                return res.status(400).json({ error: 'Tipo de usuario no válido' });
        }

        if (exists) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Verificar tipo de usuario y realizar el registro correspondiente
        switch (tipoUsuarioLower) {
            case 'administrador':
                await Administrador.create(nombre, historia || null, hashedPassword, correo_electronico, telefono);
                break;
            case 'empleado':
                await Empleado.create(nombre, hashedPassword, estado, telefono, permisos, correo_electronico, idAdministrador);
                break;
            case 'comprador':
                await Comprador.create(nombre, hashedPassword, telefono, correo_electronico);
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

// Nueva función para verificar si el usuario existe
const checkIfUserExists = async (req, res) => {
    try {
        console.log("CheckIfUserExists endpoint hit");
        const { correo_electronico, tipoUsuario } = req.body;

        if (!correo_electronico || !tipoUsuario) {
            return res.status(400).json({ error: 'Correo electrónico y tipo de usuario son obligatorios' });
        }

        // Convertir tipoUsuario a minúsculas
        const tipoUsuarioLower = tipoUsuario.toLowerCase();

        // Verificar si el correo electrónico ya está en uso
        let exists;
        switch (tipoUsuarioLower) {
            case 'administrador':
                exists = await Administrador.checkIfExistsByEmail(correo_electronico);
                break;
            case 'empleado':
                exists = await Empleado.checkIfExistsByEmail(correo_electronico);
                break;
            case 'comprador':
                exists = await Comprador.checkIfExistsByEmail(correo_electronico);
                break;
            default:
                return res.status(400).json({ error: 'Tipo de usuario no válido' });
        }

        res.json({ exists });
    } catch (err) {
        console.error('Error en la verificación de existencia del usuario:', err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login, checkIfUserExists };
