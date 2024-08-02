require('dotenv').config(); // Carga las variables de entorno

const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const empresaRoutes = require('./src/routes/empresaRoutes'); 
const insumoRoutes = require('./src/routes/insumosRoutes'); 
const productoRoutes = require('./src/routes/productosRoutes'); // Importar rutas de productos

const app = express();
app.use(express.json());


app.use(cors({
    origin: '*', // Permite todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/auth', authRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/insumo', insumoRoutes); 
app.use('/api/producto', productoRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
