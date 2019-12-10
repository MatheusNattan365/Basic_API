const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('../config');

// require('dotenv/config');


// Funçãa createUserTokenWithUserId
const createUserToken = userId => {
    return jwt.sign({ id: userId }, config.jwt_secret_key, { expiresIn: config.jwt_expires });
}

// Rota de consultas de usuários!
router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.send({ error: 'Erro na consulta' });
    }
});

// Rota de criação de usuários!
router.post('/create', async (req, res) => {
    let { email, password } = req.body
    if (!email || !password) return res.send('Dados insuficientes');

    try {
        const findUser = await Users.findOne({ email });
        if (findUser) return res.send({ error: 'Usuário já cadastrado!' });

        const newUser = await Users.create(req.body);

        return res.send({ newUser, token: createUserToken(newUser.id) });

    } catch (error) {
        return res.send({ error: 'Erro ao cadastrar!' });
    }
});

// Rota de authentication de usuários!
router.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send({ error: 'Dados insuficientes' });
    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.send({ error: 'Usuário não encontrado!' });

        bcrypt.compare(password, user.password, (error, same) => {
            if (!same) return res.send({ error: 'Senha inválida' });

            user.password = undefined;
            return res.send({ user, token: createUserToken(user.id) });
        })
    } catch (error) {
        return res.send({ error: 'Usuário não autenticado' });
    }
});

// Rota nova Senha!
router.put('/recoveryPassword', async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) return res.send({ error: 'Dados insuficientes' });

    try {
        password = await bcrypt.hash(password, 10);

        const user = await Users.findOneAndUpdate({ email }, { password })
        if (!user) return res.send({ error: 'Usuario não encontrado' });

        return res.send({ error: user.email + 'Senha Atualizada' })

    } catch (error) {
        res.send({ error: 'Erro ao atualizar senha' });
    }
})


module.exports = router;