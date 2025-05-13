const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const bankRoute = require('./routes/bankRoute');

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(morgan('dev')); // Logger para solicitudes HTTP
app.use(express.json()); // Parsear JSON en las solicitudes
app.use(cors({
  origin: process.env.FRONTEND_URL, // Permitir solicitudes desde el frontend
}));

// Rutas
app.use('/api', bankRoute);

// Rutas (las definiremos más adelante)
app.get('/', (req, res) => {
  res.send('¡Backend del banco funcionando!');
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;