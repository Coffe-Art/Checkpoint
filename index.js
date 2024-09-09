const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./src/routes/authRoutes');
const empresaRoutes = require('./src/routes/empresaRoutes'); 
const insumoRoutes = require('./src/routes/insumosRoutes'); 
const productoRoutes = require('./src/routes/productosRoutes'); 
const upload = require('./src/config/uploadConfig'); // Importar configuración de multer
const eventoRoutes = require('./src/routes/eventoRoutes'); 
const vistaCompradorRoutes = require('./src/routes/vistaCompradorRoutes')
const paymentRoutes = require('./src/routes/paymentRoutes')



const app = express();

app.use(express.json());

// Configuración de CORS
app.use(cors({
    origin: '*', // Permite todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
}));

// Middleware para agregar la cabecera Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Configuración de Content Security Policy usando Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Desactiva CSP para simplificar pruebas
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/insumo', insumoRoutes); 
app.use('/api/producto', productoRoutes); 
app.use('/api/evento', eventoRoutes);
app.use('/api/comprador', vistaCompradorRoutes);
app.use('/api/payment', paymentRoutes);

// Servir archivos estáticos
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));