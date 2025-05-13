const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necesario para Neon.tech
  },
  idleTimeoutMillis: 30000, // Tiempo máximo de inactividad antes de cerrar la conexión (30 segundos)
  max: 20, // Número máximo de clientes en el pool
  connectionTimeoutMillis: 2000, // Tiempo máximo para establecer una conexión (2 segundos)
});

pool.on('error', (err, client) => {
  console.error('Error inesperado en el pool:', err.stack);
  // No lanzar el error directamente para evitar que el proceso se cierre
});

pool.on('connect', () => {
  console.log('Nueva conexión establecida con la base de datos');
});

module.exports = pool;