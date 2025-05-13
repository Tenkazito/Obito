const newUserService = require('../services/newUserService');

const newUser = async (req, res) => {
    try {
        const result = await newUserService.createUser(req.body);
        res.status(201).json({ message: 'Usuario creado exitosamente', result });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

module.exports = { newUser };
