const express = require('express');
const _router = express.Router();
const jwt2 = require('jwt-simple');
const jwt_decode = require('jwt-decode');
const moment = require('moment');
const categoriesSchema = require('../modules/categories');

_router.get('/', (res, req) => {
    categoriesSchema
        .find({},(erro, data) => {
            if(data.length === 0  || erro){
                return req.send({error : 'Erro ao consultar as categorias'})
            }else{
                return req.send({data})
            }
        })
})

_router.post('/insert', (req, res) => {
    const body = req.body;
    categoriesSchema.findOne({ nome: body.nome }, (err, data) => {
        if (data) {
            return res.send({ message: 'Está categoria já existe.' });
        } else {
            categoriesSchema
            .create(body, (err, data) => {
                if (err) {
                    return res.send({ message: 'erro ao criar a categoria!', err});
                } else {
                    return res.send({
                        message: 'Categoria criada com sucesso!',
                        data
                    });
                }

            });
        }
    });
});

_router.put('/edit', (req, res) => {
    const body = req.body;
    const slug = body.slug;
    categoriesSchema.updateOne({ slug }, body, (err, data) => {
        if (data) {
            return res.send({ message: 'Atualizado com sucesso ! ', data });
        } else {
            return res.send({message: 'Houve um erro na edicao do cadastro.', err });
        }
    })
})

module.exports = _router;