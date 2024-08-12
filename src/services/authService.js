require('dotenv').config(); // Carga las variables de entorno
console.log('JWT_SECRET in authService:', process.env.JWT_SECRET); // Verifica que se cargue la variable

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db'); 
const { promisify } = require('util');

const query = promisify(pool.query).bind(pool);

// Función para registrar un nuevo usuario
const register = async (tipoUsuario, nombre, contrasena, correo_electronico, telefono, historia, estado, permisos, idAdministrador) => {
    try {
        // Convertir tipoUsuario a minúsculas
        const tipoUsuarioLower = tipoUsuario.toLowerCase();

        // Hashear la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        let procedure;
        let params;

        switch (tipoUsuarioLower) {
            case 'administrador':
                procedure = 'CALL CreateAdministrador(?, ?, ?, ?, ?)';
                params = [nombre, historia || null, hashedPassword, correo_electronico, telefono];
                break;
            case 'empleado':
                procedure = 'CALL CreateEmpleado(?, ?, ?, ?, ?, ?, ?)';
                params = [nombre, hashedPassword, estado, telefono, permisos, correo_electronico, idAdministrador];
                break;
            case 'comprador':
                procedure = 'CALL CreateComprador(?, ?, ?, ?)';
                params = [nombre, hashedPassword, telefono, correo_electronico];
                break;
            default:
                throw new Error('Tipo de usuario no válido');
        }

        // Ejecutar el procedimiento almacenado con los parámetros
        await query(procedure, params);
    } catch (err) {
        console.error('Error en el registro:', err.message);
        throw new Error('Error al registrar usuario: ' + err.message);
    }
};

// Función para iniciar sesión
const login = async (tipoUsuario, correo_electronico, contrasena) => {
    try {
        // Convertir tipoUsuario a minúsculas
        const tipoUsuarioLower = tipoUsuario.toLowerCase();

        let table;
        let idField;

        switch (tipoUsuarioLower) {
            case 'administrador':
                table = 'administrador';
                idField = 'idadministrador';
                break;
            case 'empleado':
                table = 'empleado';
                idField = 'idempleado';
                break;
            case 'comprador':
                table = 'comprador';
                idField = 'idcomprador';
                break;
            default:
                throw new Error('Tipo de usuario no válido');
        }

        // Consultar al usuario en la base de datos por correo electrónico
        const result = await query(`SELECT * FROM ${table} WHERE correo_electronico = ?`, [correo_electronico]);

        if (result.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        const user = result[0];

        // Comparar la contraseña ingresada con la contraseña hasheada almacenada
        const match = await bcrypt.compare(contrasena, user.contrasena);

        if (!match) {
            throw new Error('Contraseña incorrecta');
        }

        // Generar un token JWT si la autenticación es exitosa
        const token = jwt.sign({ id: user[idField], tipoUsuario: tipoUsuarioLower }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (err) {
        console.error('Error en el login:', err.message);
        throw new Error('Error al iniciar sesión: ' + err.message);
    }
};

// Función para verificar si el usuario ya existe usando procedimientos almacenados
const checkIfUserExists = async (correo_electronico, tipoUsuario) => {
    try {
        // Convertir tipoUsuario a minúsculas
        const tipoUsuarioLower = tipoUsuario.toLowerCase();

        let procedure;

        switch (tipoUsuarioLower) {
            case 'administrador':
                procedure = 'CALL ThisAdminExist(?, @p_existe)';
                break;
            case 'empleado':
                procedure = 'CALL ThisEmployerExist(?, @p_existe)';
                break;
            case 'comprador':
                procedure = 'CALL ThisBuyerExist(?, @p_existe)';
                break;
            default:
                throw new Error('Tipo de usuario no válido');
        }

        // Ejecutar el procedimiento almacenado y obtener el valor del parámetro de salida
        const result = await query(procedure, [correo_electronico]);

        // Obtener el valor del parámetro de salida
        const exists = result[0][0].p_existe;

        return exists > 0; // Devuelve true si el usuario existe, false en caso contrario
    } catch (err) {
        console.error('Error al verificar existencia del usuario:', err.message);
        throw new Error('Error al verificar existencia del usuario: ' + err.message);
    }
};

module.exports = { register, login, checkIfUserExists };
