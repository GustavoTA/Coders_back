const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    nome: {type: String},
    sobreNome: {type: String},
    email: {type: String, unique: true},
    senha: {type : String},
    data_criacao: {type: String},
    data_atualizacao: {type: String},
    ultimo_login: {type: String},
    token: {type: String}
})

module.exports = mongoose.model('User', UserSchema);