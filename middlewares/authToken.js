const jwt = require('jsonwebtoken');
const config = require('../config');
// require('dotenv/config');

const auth = (req,res,next) => {
    const token_header = req.headers.auth;

    if(!token_header) return res.send({error: 'Usuário não autenticado. Token não enviado'});

    jwt.verify(token_header, config.jwt_secret_key, (error, decoded) => {
        if(error) return res.send({error: 'Token inválido'});
        
        // Passar variaveis via rota
        res.locals.auth_data = decoded;
        return next();
    })
}

module.exports = auth;