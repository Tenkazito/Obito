const logInService = require('../services/logInService');

const logIn = async (req, res) => {
    try {
        const result = await logInService.logUser(req.body);
        res.status(201).json({ message: 'Success login in', result });
    } catch (error) {
        res.status(500).json({ error: 'Error login user' });
    }
}

module.exports = { logIn };