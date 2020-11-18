const express = require('express');
const _router = express.Router();
const articlesSchema = require('../modules/articles');

_router.get('/', (res, req) => {
    articlesSchema
        .find({},(erro, data) => {
            if(data.length === 0  || erro){
                return req.send({error : 'Erro ao consultar as atigos'})
            }else{
                return req.send({data})
            }
        })
})

_router.post('/insert', (req, res) => {
    const body = req.body;
    const slug = body.slug
    articlesSchema.findOne({ slug }, (err, data) => {
        if (data) {
            return res.send({ message: 'Está atigo já existe.' });
        } else {
            articlesSchema
            .create(body, (err, data) => {
                if (err) {
                    return res.send({ message: 'erro ao criar a atigo!', err});
                } else {
                    return res.send({
                        message: 'atigo criada com sucesso!',
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
    articlesSchema.updateOne({ slug }, body, (err, data) => {
        if (data) {
            return res.send({ message: 'Atualizado com sucesso ! ', data });
        } else {
            return res.send({message: 'Houve um erro na edicao do cadastro.', err });
        }
    })
})

_router.delete('/delete', (req, res) => {
    const body = req.body;
    const slug = body.slug;
    articlesSchema.deleteMany({ slug }, body, (err, data) => {
        if (data) {
            return res.send({ message: 'Deletado com sucesso ! ', data });
        } else {
            return res.send({message: 'Houve um erro na deleção.', err });
        }
    })
})

module.exports = _router;