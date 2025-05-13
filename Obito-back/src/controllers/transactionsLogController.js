const transactionsLogService = require('../services/transactionsLogService');

const newLog = async (req, res) => {
    try {
        const result = await transactionsLogService.createTransactionLog(req.body);
        res.status(201).json({ message: 'Log returned succesfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Error getting log' });
    }
}

module.exports = { newLog };
