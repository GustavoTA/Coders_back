const express = require('express')
const userRoute = require('./routes/userRoute')
const http = require('http')
const mongoose = require('mongoose')
const app = express()


//Configurações Base de Dados
const passwordMongo = 'OMmuI0h0IscQEwgV'
const urlMongo = 'mongodb+srv://micro:'+passwordMongo+'@microservicos.cnyxh.mongodb.net/Codres'
const options = { poolSize: 5, useUnifiedTopology: true, useNewUrlParser: true}

// start mongo
mongoose.connect(urlMongo, options)
mongoose.set('useCreateIndex', true)

// express use
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/user', userRoute)
// app.use('/saldo')

//port
const server = http.createServer(app)
server.listen(process.env.PORT || 3000);
console.log('Rodando na porta ' + 3000)

module.exports = app