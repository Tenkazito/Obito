const pool = require('../config/db');

const logUser = async (userData) => {
    const { email, password } = userData;
    const client = await pool.connect(); // Obtener un cliente para la transacción

    try {
        const userResult = await client.query(
            'SELECT name, lastname, email, accounts.id AS AccountId, active FROM users JOIN accounts ON users.id = accounts.userid WHERE email = $1 AND credential = $2',
            [email, password]
        );
        if (userResult.rows.length === 0) {
            throw new Error('User not found or invalid credentials');
        }

        return userResult.rows[0];
    } catch (error) {
        console.error('Error Login in: ', error.stack);
        throw error;
    } finally {
        client.release(); // Liberar el cliente
    }
}

module.exports = { logUser };