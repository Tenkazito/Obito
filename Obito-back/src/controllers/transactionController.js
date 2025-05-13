const transactionService = require('../services/transactionService');

const newTransaction = async (req, res) => {
    try {
        const result = await transactionService.createTransaction(req.body);
        res.status(201).json({ message: 'Success Transaction', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { newTransaction };