require('dotenv').config(); // Carga las variables de entorno
const bcrypt = require('bcrypt');
const Administrador = require('../models/administrador');
const Comprador = require('../models/comprador');
const Empleado = require('../models/empleado');
const authService = require('../services/authService');
const { sendEmail } = require('../services/emailVef'); // Importar la función de envío de correos

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
        const html = `
            <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a Coffe Art</title>
    <style>
        body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-image: url('https://imagenes224.blob.core.windows.net/imagenes224/FondoMenu.png');
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }
        .header img {
            max-width: 100px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #ffffff;
            font-size: 24px;
            margin: 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h2 {
            color: #333333;
            font-size: 2rem;
        }
        .content p {
            color: #555555;
            line-height: 1.5;
            font-size: 1.2rem;
        }
        .link-button {
            margin-top: 2rem;
            margin-bottom: 2rem;
            text-align: center; /* Centra el contenido */
        }
        .link-button a {
            display: inline-block; /* Asegura que el enlace se comporte como un bloque en línea */
            padding: 0.75rem 1.5rem;
            border-radius: 3rem;
            border: none;
            background-color: #B89158;
            color: white;
            text-decoration: none;
            font-size: medium;
        }
        .link-button a:hover {
            background-color: #F1BF76;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #271d25;
            color: #ffffff;
            border-radius: 0 0 8px 8px;
        }
        .footer a {
            color: #ffffff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://imagenes224.blob.core.windows.net/imagenes224/logoCA.webp" alt="Coffe Art Logo">
            <h1>Bienvenido a Coffe Art</h1>
        </div>
        <div class="content">
            <h2>Hola ${nombre},</h2>
            <p>Gracias por registrarte como <strong>${tipoUsuarioLower}</strong> en Coffe Art.</p>
            <p>Estamos emocionados de tenerte con nosotros. ¡Esperamos que disfrutes de todos nuestros servicios y productos!</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        </div>
        <div class="link-button">
            <a href="https://www.coffeart.com">Visita nuestra página web</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 Coffe Art. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
            `;
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
