if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require ('express')
const mongoose = require('mongoose') //BD
const app = express()
const handlebars = require('express-handlebars')
const PORT = 8085

const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")

//chamando as rotas
const Routes = require("./routes/auth")

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    is_logged_in: false,
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

//chamam a engine
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//chamas img,js e css da pagina
app.use('/public', express.static(__dirname + '/public'))

//Conecta com mongodb
mongoose.connect(process.env.dbURI)
.then((result) => console.log('Conexão com banco de dados sucesso'))
.catch((erro) => console.log(erro))

//chamando rotas
app.use('/', Routes)

app.listen(PORT, function(){
    console.log("Servidor vivo em http://localhost:"+PORT)
})