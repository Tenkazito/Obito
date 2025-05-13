const pool = require('../config/db');
const PDFDocument = require('pdfkit');

const pdfLogService = async (userData) => {
    const { accountId, accountLog } = userData;
    const client = await pool.connect();
    
    try {
        const userInfo = await client.query(
            'SELECT users.id AS userId, users.name AS name, users.lastname AS lastname FROM users JOIN accounts ON users.id = accounts.userid WHERE accounts.id = $1',
            [accountId]
        );
        const { userid, name, lastname } = userInfo.rows[0];

        // Crear el documento PDF
        const doc = new PDFDocument();
        
        // Agregar contenido al PDF
        doc.fontSize(12);

        // Párrafo con información del usuario
        doc.text(`Movements Report`, { align: 'center' });
        doc.moveDown();
        doc.text(
            `User: ${name} ${lastname}\n` +
            `User ID: ${userid}\n` +
            `Account ID: ${accountId}\n` +
            `Date of generation: ${new Date().toLocaleDateString()}`,
            { align: 'left' }
        );

        // Espacio antes de la tabla
        doc.moveDown(2);

        // Configuración de la tabla
        const tableTop = doc.y;
        const colWidths = [80, 100, 100, 100, 80]; // Ancho de cada columna
        const rowHeight = 20;

        // Encabezados de la tabla
        doc.font('Helvetica-Bold');
        doc.text('ID', 50, tableTop, { width: colWidths[0], align: 'left' });
        doc.text('Date', 50 + colWidths[0], tableTop, { width: colWidths[1], align: 'left' });
        doc.text('Account', 50 + colWidths[0] + colWidths[1], tableTop, { width: colWidths[2], align: 'left' });
        doc.text('Name', 50 + colWidths[0] + colWidths[1] + colWidths[2], tableTop, { width: colWidths[3], align: 'left' });
        doc.text('Amount', 50 + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], tableTop, { width: colWidths[4], align: 'right' });
        doc.font('Helvetica');

        // Línea divisoria debajo de los encabezados
        doc.moveTo(50, tableTop + rowHeight - 8)
            .lineTo(50 + colWidths.reduce((a, b) => a + b, 0), tableTop + rowHeight - 8)
            .stroke();

        // Filas de la tabla
        accountLog.forEach((log, index) => {
            const y = tableTop + (index + 1) * rowHeight;
            doc.text(log.movementid, 50, y, { width: colWidths[0], align: 'left' });
            doc.text(log.logdate, 50 + colWidths[0], y, { width: colWidths[1], align: 'left' });
            doc.text(log.accountto, 50 + colWidths[0] + colWidths[1], y, { width: colWidths[2], align: 'left' });
            doc.text(`${log.name} ${log.lastname}`, 50 + colWidths[0] + colWidths[1] + colWidths[2], y, { width: colWidths[3], align: 'left' });
            doc.text(Number(log.amount).toFixed(2), 50 + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y, { width: colWidths[4], align: 'right' });
        });

        return doc; // Devolver el documento PDF
    } catch (error) {
        console.error('PDF Log Error: ', error.stack);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = { pdfLogService };