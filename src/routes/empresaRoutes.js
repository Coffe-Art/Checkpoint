// src/routes/empresaRoutes.js
const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const { verifyAdminOrEmployee } = require('../middlewares/authMiddleware');

// Ruta para crear una nueva empresa (solo administradores)
router.post('/nuevaEmpresa', verifyAdminOrEmployee, (req, res) => {
    console.log('POST /nuevaEmpresa');
    empresaController.createEmpresa(req, res);
});

// Ruta para obtener detalles de una empresa específica (cualquiera que esté autenticado)
router.get('/consultar/:codigoempresa', verifyAdminOrEmployee, (req, res) => {
    console.log('GET /consultar/:codigoempresa');
    empresaController.getEmpresa(req, res);
});

// Ruta para obtener todas las empresas creadas por un administrador específico (cualquiera que esté autenticado)
router.get('/consultarPorAdministrador/:idadministrador', verifyAdminOrEmployee, (req, res) => {
    console.log('GET /consultarPorAdministrador/:idadministrador');
    empresaController.getEmpresasByAdmin(req, res);
});

// Ruta para actualizar una empresa existente (solo administradores)
router.put('/actualizar/:codigoempresa', verifyAdminOrEmployee, (req, res) => {
    console.log('PUT /actualizar/:codigoempresa');
    empresaController.updateEmpresa(req, res);
});

// Ruta para eliminar una empresa (solo administradores)
router.delete('/eliminar/:codigoempresa', verifyAdminOrEmployee, (req, res) => {
    console.log('DELETE /eliminar/:codigoempresa');
    empresaController.deleteEmpresa(req, res);
});

module.exports = router;
