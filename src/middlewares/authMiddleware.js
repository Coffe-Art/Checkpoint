// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No se proporcionó un token' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }

        req.user = decoded;
        next();
    });
};

// Middleware para verificar el rol de administrador o empleado
const verifyAdminOrEmployee = (req, res, next) => {
    // Verifica que el token sea válido
    verifyToken(req, res, () => {
        const rolesPermitidos = ['administrador', 'empleado'];
        if (rolesPermitidos.includes(req.user.tipoUsuario)) {
            next();
        } else {
            res.status(403).json({ error: 'Acceso denegado: Rol no autorizado' });
        }
    });
};

module.exports = { verifyToken, verifyAdminOrEmployee };
