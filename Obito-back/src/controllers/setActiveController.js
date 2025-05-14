const setActiveService = require('../services/setActiveService');

const setActiveUser = async (req, res) => {
    try {
        const result = await setActiveService.setActive(req.body);
        res.status(201).json({ message: 'Success Transaction', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { setActiveUser };