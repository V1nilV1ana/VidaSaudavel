const router = require('express').Router()
const passport = require('passport')
const User = require('../Models/User')
const Postreview = require('../Models/Post')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailer = require('../Models/mailer')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user){
        done(err, user)
    })
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
}, function(req,email, password, done){
    User.findOne({email: email}, function(err, user){
        if(err) {return done(err)}
        if(!user){
            return done(null, false, req.flash('erro', 'Esse email esta incorreto'))
        }
        bcrypt.compare(password, user.password, function(err, isMatch){ 
            if(err) {return done(err)}

            if(isMatch){
            
                return done(null, user)

            } else {
              return done(null, false,  req.flash('erro', 'Essa senha esta incorreta'))
            }

            
        })

    })
}))



//enviar html do servidor para o client
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.render('indexAuth')
       }else
        res.render('index')
})

router.get('/planos', function(req, res){
    if(req.isAuthenticated()){
        res.render('PlanosAuth')
       }else
        res.render('Planos')
})

router.get('/faq', function(req, res){
    if(req.isAuthenticated()){
        res.render('FAQAuth')
       }else
        res.render('FAQ')
})

router.get('/feedback', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/deixefeed')
    }else
    Postreview.find({}).lean()
    .sort({createdAt: -1})
    .then((Postreview) =>{
        res.render('FeedBack', {Postreview: Postreview})
    })
    .catch((erro) => {
        console.log(erro)
    })
    
})

router.get('/deixefeed', function (req, res){
    if(req.isAuthenticated()){
    Postreview.find({}).lean()
    .sort({createdAt: -1})
    .then((Postreview) =>{
        res.render('FeedBackAuth', {Postreview: Postreview, isAuth:req.isAuthenticated()})
    })
    .catch((erro) => {
        console.log(erro)
    })
}else{
    res.redirect('/cadastrar')
}
})


router.get('/login', (req, res)=>{
    if(req.isAuthenticated()){
        res.render('indexAuth')
       }else
        res.locals.message = req.flash('message');
        res.render('Login', { message: req.flash('erro') })
})
router.get('/cadastrar', function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/deixefeed')
    }else
    res.render('Cadastrar')
})
router.get('/perda', function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/deixefeed')
    }else
    res.render('Perda')
})



router.get('/senha', function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/deixefeed')
    }else
    res.render('Senha')
})

//cadastro de usuario
router.post("/auth/register", async(req,res, next)=>{
    const confpassword = req.body.confpass
    const password = req.body.password
    
    try {
        if(password !== confpassword){
            return res.render('Cadastrar', {message: 'As senhas estão diferentes'})
             
        }
        if(await User.findOne({ email: req.body.email })){
           return res.render('Cadastrar', {message: 'Esse email ja existe no nosso sistema'})
           
        }
        


        const hashedPassword = await bcrypt.hash(password, 10)
        const registarUsers = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        registarUsers.save()
        console.log(registarUsers)
        res.redirect("/login")
        }
        catch (e) {
        console.log(e)
        res.redirect("/cadastrar")
    }
})

//login
router.post("/auth/login", passport.authenticate('local',{
   successRedirect: '/feedback',
    failureRedirect:"/login",
    failureFlash: true,
}))

//email
router.post("/auth/reset", async(req,res)=>{
    const { email } = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.render('Perda', {message: 'Email não encontrado'})
        }
        const token = crypto.randomBytes(20).toString('hex')
        const now = new Date()
        now.setHours(now.getHours() + 1)

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        })
        mailer.sendMail({
            to: email,
            from: 'VidaSaudavel@vsteste.com',
            subject: 'Ola envio de pedido de reset de senha',
            template: 'forgotPassword',
            context: { token},
                        
        }, (err) =>{
        if(err)
        {
            console.log(err)
            return res.render('Perda', {message: 'Não foi possivel enviar o email'})
        }
        return res.render('Perda', {messageSucess: 'Email enviado com sucesso'})
    })
    } catch (e) {
        console.log(e)
        res.redirect("/perda")
    }
})

//senha
router.post("/auth/new-password", async(req,res)=>{
    const Token = req.body.token
    const password = req.body.password
    const npass = req.body.newpass
    try {
        const user = await User.findOne({passwordResetToken: Token})
        if(!user){
            return res.render('Senha', {message: 'Usuario não encontrado'})
            
        }
        if(Token !== user.passwordResetToken){
            return res.render('Senha', {message: 'Token Incorreta'})
        }
        const now = new Date()
        if(now > user.passwordResetExpires){
            return res.render('Senha', {message: 'Esse token expirou peça outro'})
            
        }
        if(password !== npass){
            return res.render('Senha', {message: 'As senhas não batem'})
        }
        
        
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        await user.save()
        res.redirect("/login")

    } catch (erro) {
        console.log('Não foi possivel resetar o password' + erro)
        return res.render('Senha', {message: 'Não foi possivel resetar o password'})
        
    }
    
} )

//rota para enviar para a base de dados
router.post('/add',function(req, res){
    console.log(req.body)
    const post = new Postreview(req.body)
    post.save()
    .then((result) => {
        res.redirect('/feedback')
    }).catch((erro) =>{
        res.send("ERRO: " + erro)
    })
    
})

//deleta posts
router.get('/delete/:id', function(req, res){
    const id = req.params.id;
    Postreview.findByIdAndDelete(id)
    .then((result) => {
        res.redirect('/feedback')
    }).catch((erro) =>{
        res.send(erro)
    })

})





//logout
router.get("/auth/logout", function(req, res, next) {
    //metodo de logout do passport
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      })
    })

module.exports = router