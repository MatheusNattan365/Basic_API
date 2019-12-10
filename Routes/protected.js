const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authToken')

router.get('/', auth, (req,res) => {
    console.log(res.locals.auth_data)
    return res.send({message: 'Rota Protegida!'})
});


module.exports = router