const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    return res.send({message: 'GET root'})
});

router.post('/', (req,res) => {
    let {nome, idade} = req.body
    return res.send({message: `POST root ${nome} : ${idade}`})
});


module.exports = router