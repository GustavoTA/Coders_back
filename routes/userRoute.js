const express = require('express');
const _router = express.Router();
const jwt2 = require('jwt-simple');
const jwt_decode = require('jwt-decode');
const moment = require('moment');
const userSchema = require('../modules/user');

_router.get('/', (res, req) => {
    userSchema
        .find({},(erro, data) => {
            if(data.length === 0  || erro){
                return req.send({error : 'Erro ao consultar usuário'})
            }else{
                return req.send({data})
            }
        })
})

_router.post('/singin', (req, res) => {
    const body = req.body
    const email = body.email
    const senha = body.senha
    if(!email){ return res.send({mensagem : "Insira o email"})}
    if(!senha){ return res.send({mensagem: "Informe a senha"})}
    if(!email || !senha){ return res.send({mensagem: "Insira o email e a senha"})}
    userSchema.findOne({email, senha},(err, data) => {
            moment().locale;
            body.ultimo_login =  moment().format('MMMM Do YYYY, h:mm:ss a')
            const teste = JSON.stringify({ user: body.email, time: body.data_criacao });
            var token = jwt2.encode(teste, '###');
            body.token = token;
            if (!err) {
                userSchema.updateOne({ email }, body, (error, data) => {
                    if (data) {
                        return res.send({
                            message: 'login feito com sucesso',
                            token
                        })
                    } else {
                        return res.send({ message: 'Houve um problemas no login, tente novamente', err });
                    }
                });
            } else {
                return res.status(401).send({ message: 'Usuario e/ou senha invalidos', err })
            }
        })
})


_router.post('/signup', (req, res) => {
    const body = req.body;
    moment().locale;
    body.data_criacao = moment().format('MMMM Do YYYY, h:mm:ss a');
    const teste = JSON.stringify({ user: body.email, time: body.data_criacao });
    var token = jwt2.encode(teste, '###');
    body.token = token;
    userSchema.findOne({ email: body.email }, (err, data) => {
        if (data) {
            return res.send({ message: 'Email ja existente.' });
        } else {
            userSchema
            .create(body, (Error, data) => {
                if (Error) {
                    return res.send({ message: 'erro ao criar o usuario', error: Error});
                } else {
                    return res.send({
                        message: 'Cadastro feito com sucesso',
                        data
                    });
                }

            });
        }
    });
});

_router.put('/edit', (req, res) => {
    const body = req.body;
    const { email } = body.email;
    body.data_atualizacao = new Date();
    userSchema.updateOne({ email: email }, body, (error, data) => {
        if (data) {
            return res.send({ message: 'Atualizado com sucesso ! ', data });
        } else {
            return res.send({message: 'Houve um erro na edicao do cadastro.', error: error });
        }
    })
});


_router.post('/search', (req, res) => {
    let decodeheader;
    if (req.headers['authorization']) {
        decodeheader = jwt_decode(req.headers['authorization']);
    } else {
        if(req.headers['auth']) {
            decodeheader = jwt_decode(req.headers['auth']);
        }
    }

    const headerEncode = jwt2.encode(decodeheader, '###');
    if (headerEncode) {
        userSchema.findOne(({ token: headerEncode }), (error, data) => {
            if (error) {
                return res.send({ message: 'Não autorizado' });
            } else {
                const headerDecode = JSON.parse(jwt_decode(headerEncode));
                if (headerDecode.time - moment().format('MMMM Do YYYY, h:mm:ss a') > 30) {
                    return res.send({ message: 'Sessão invalida' });
                }
                return res.send({ data });
            }
        })
    } else {
        return res.send({ message: 'Não autorizado' })
    }
})


module.exports = _router;