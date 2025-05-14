const pool = require('../config/db');

const setActive = async (userData) => {
    const {accountId} = userData;
    const client = await pool.connect(); // Obtener un cliente para la transacción

    try {
        const result = await client.query(
            `UPDATE Accounts
            SET active = CASE 
                WHEN active = true THEN false 
                WHEN active = false THEN true
            END
            WHERE id = $1
            RETURNING active;`,
            [accountId]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error setting active: ', error.stack);
        throw error;
    } finally {
        client.release(); // Liberar el cliente
    }
}

module.exports = { setActive };