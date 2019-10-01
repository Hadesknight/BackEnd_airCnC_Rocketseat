const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://<USUARIO>:<PASSWORD>@cluster0-nyh4r.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology:true
})


const app = express()

app.use(express.json())
app.use(routes)




app.listen(3333)