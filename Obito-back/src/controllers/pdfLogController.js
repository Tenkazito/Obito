const { pdfLogService } = require('../services/pdfLogService');

const pdfLogController = async (req, res) => {
    try {
        // Generar el PDF usando el servicio
        const pdfDoc = await pdfLogService(req.body);

        // Configurar las cabeceras para la descarga del archivo
        const filename = encodeURIComponent('movements_log.pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/pdf');

        // Manejar errores en el stream
        pdfDoc.on('error', (error) => {
            console.error('PDF Stream Error:', error.message);
            // Solo enviar respuesta si no se ha enviado ya
            if (!res.headersSent) {
                res.status(500).json({ error: 'Error generating PDF' });
            }
        });

        // Enviar el PDF al cliente
        pdfDoc.pipe(res);
        pdfDoc.end();
    } catch (error) {
        console.error('Controller Error:', error.message);
        // Solo enviar respuesta si no se ha enviado ya
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = { pdfLogController };