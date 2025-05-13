const pool = require('../config/db');

const createUser = async (userData) => {
    const { name, lastName, email, country, password } = userData;
    const client = await pool.connect(); // Obtener un cliente para la transacción

    try {
        await client.query('BEGIN'); // Iniciar la transacción

        // Insertar el usuario y obtener su id
        const userResult = await client.query(
            'INSERT INTO users (name, lastname, email, country, credential) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [name, lastName, email, country, password]
        );
        const userId = userResult.rows[0].id;

        // Insertar una cuenta para el usuario usando el userId
        const accountResult = await client.query(
            'INSERT INTO accounts (userid) VALUES ($1) RETURNING *',
            [userId]
        );

        await client.query('COMMIT'); // Confirmar la transacción

        return true;
    } catch (error) {
        await client.query('ROLLBACK'); // Revertir la transacción en caso de error
        console.error('Transaction Error: ', error.stack);
        throw error;
    } finally {
        client.release(); // Liberar el cliente
    }
};

module.exports = { createUser };