const pool = require('../config/db');

const createTransactionLog = async (userData) => {
    const { accountId } = userData;
    const client = await pool.connect();

    try {
        const logResult = await client.query(
            "SELECT m.id AS movementid, COALESCE(TO_CHAR(m.logDate, 'DD/MM/YYYY HH24:MI'), 'Sin fecha') AS logdate, m.accountTo, u.name AS name, u.lastname AS lastname, m.amount FROM Movements m JOIN Accounts a ON m.accountTo = a.id JOIN Users u ON a.userId = u.id WHERE m.accountFrom = $1 ORDER BY m.logDate DESC LIMIT 20",
            [accountId]
        );

        return logResult.rows
    } catch (error) {
        console.error('Log Error: ', error.stack);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = { createTransactionLog };