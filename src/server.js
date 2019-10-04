const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

//para fazer a comunicação em tempo real usando o socket.io
//vamos instalar o socket, e aqui vamos importar o http, e o socketio
const http = require('http')
const socketio = require('socket.io')


const app = express()

//vamos criar o server, usando o http.Server, passando como parametro o nosso app
const server = http.Server(app)

// e apos vamos criar chamar o socket, para comucação, usando o nosso server http
const io = socketio(server)



mongoose.connect("mongodb://hadesknight:fernando23@kamino.mongodb.umbler.com:50590/base_geral",{
    useNewUrlParser: true,
    useUnifiedTopology:true
})


//salvaremos aqui os usuarios logados na nossa aplicação
const connectUsers = {}

//essa função vai ouvir, e pegar todos q estão conectados na aplicação, e vamos salvar a conexão via function
io.on('connection', socket =>{
    //pegando o user_id do cliente que esta mandando solicitação no socketio
    const {user_id} = socket.handshake.query
    //pegando o id do usuario logado, e relacionando com o usuario do socket
    connectUsers[user_id] =  socket.id

})

//com os metodos use, estaremos setando metodos para todas as rotas, de qualquer tipo

//usando midware para o socketio
//usaremos como parametro o req, e o res, normal para receber e enviar dados nas respostas e requisições, e usaremos o next, para quando o socket,
//terminar a função, ele passar para o proximo USE
app.use((req, res, next)=>{
    //adicionando o io ao req, assim todas as requisições do app podem usar o io, e usar o socket
    req.io = io
    //todas as requisições tem acesso a todos os usuarios conectados
    req.connectUsers = connectUsers

    return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/files', express.static(path.resolve(__dirname, '..', 'upload')))


//trocaremos quem vai ouvir a porta, era APP do express, passaremos para o server do http
server.listen(3333)