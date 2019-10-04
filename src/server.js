const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')


const app = express()

mongoose.connect("mongodb://<Usuario>:<Senha>@kamino.mongodb.umbler.com:50590/base_geral",{
    useNewUrlParser: true,
    useUnifiedTopology:true
})


app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/files', express.static(path.resolve(__dirname, '..', 'upload')))


app.listen(3333)