const { parse } = require('dotenv');
const pool = require('../config/db');

const createTransaction = async (userData) => {
    const { accountFrom, accountTo, amount } = userData;
    const client = await pool.connect(); // Obtener un cliente para la transacción

    const formattedAmount = Number(amount);
    try {
        if (accountFrom === accountTo) {
            throw new Error('You cannot transfer to yourself');
        }
        await client.query('BEGIN'); // Iniciar la transacción

        // Query 1: Bloquear cuentas e insertar en Movements
        const insertQuery = `
            WITH locked_accounts AS (
                SELECT 
                    a1.id AS accountFrom,
                    a1.balance AS from_balance,
                    a1.denomination AS from_denomination,
                    a2.id AS accountTo,
                    a2.denomination AS to_denomination
                FROM Accounts a1
                CROSS JOIN Accounts a2
                WHERE a1.id = $1
                  AND a2.id = $2
                  AND a1.active = true
                  AND a2.active = true
                FOR UPDATE
            )
            INSERT INTO Movements (accountFrom, accountTo, amount, logDate)
            SELECT 
                accountFrom,
                accountTo,
                $3::NUMERIC,
                CURRENT_TIMESTAMP
            FROM locked_accounts
            WHERE accountFrom IS NOT NULL
              AND accountTo IS NOT NULL
              AND from_denomination = to_denomination
              AND $3 > 0
              AND from_balance >= $3
            RETURNING id;
        `;

        const insertResult = await client.query(insertQuery, [accountFrom, accountTo, formattedAmount]);

        // Verificar si se creó el movimiento
        if (!insertResult.rows[0]) {
            // Determinar el motivo del fallo
            const fromAccountCheck = await client.query(
                'SELECT balance, active, denomination FROM Accounts WHERE id = $1',
                [accountFrom]
            );
            const toAccountCheck = await client.query(
                'SELECT active, denomination FROM Accounts WHERE id = $1',
                [accountTo]
            );

            let errorMessage = 'Error in transaction';
            if (!fromAccountCheck.rows[0]) errorMessage = 'Reminent Account not found';
            else if (!toAccountCheck.rows[0]) errorMessage = 'Destination Account not found';
            else if (!fromAccountCheck.rows[0].active) errorMessage = 'Remitent Account inactive';
            else if (!toAccountCheck.rows[0].active) errorMessage = 'Destination Account inactive';
            else if (fromAccountCheck.rows[0].denomination !== toAccountCheck.rows[0].denomination)
                errorMessage = 'Accounts must be in the same denomination';
            else if (fromAccountCheck.rows[0].balance < parseFloat(amount)) errorMessage = 'Insufficient funds';

            await client.query('ROLLBACK');
            throw new Error(errorMessage);
        }

        // Query 2: Actualizar saldo de la cuenta remitente
        const updateFromQuery = `
            UPDATE Accounts
            SET balance = balance - $1
            WHERE id = $2
              AND EXISTS (
                  SELECT 1
                  FROM Accounts a1
                  CROSS JOIN Accounts a2
                  WHERE a1.id = $2
                    AND a2.id = $3
                    AND a1.active = true
                    AND a2.active = true
                    AND a1.denomination = a2.denomination
                    AND $1 > 0
                    AND a1.balance >= $1
              );
        `;
        await client.query(updateFromQuery, [formattedAmount, accountFrom, accountTo]);

        // Query 3: Actualizar saldo de la cuenta destinataria
        const updateToQuery = `
            UPDATE Accounts
            SET balance = balance + $1
            WHERE id = $2
              AND EXISTS (
                  SELECT 1
                  FROM Accounts a1
                  CROSS JOIN Accounts a2
                  WHERE a1.id = $3
                    AND a2.id = $2
                    AND a1.active = true
                    AND a2.active = true
                    AND a1.denomination = a2.denomination
                    AND $1 > 0
                    AND a1.balance >= $1
              );
        `;
        await client.query(updateToQuery, [formattedAmount, accountTo, accountFrom]);

        await client.query('COMMIT'); // Confirmar la transacción
        return { movement_id: insertResult.rows[0].id, status: 'completed' };
        
    } catch (error) {
        await client.query('ROLLBACK'); // Revertir en caso de error
        console.error('Transaction Error: ', error.stack);
        throw error;
    } finally {
        client.release(); // Liberar el cliente
    }
};

module.exports = { createTransaction };