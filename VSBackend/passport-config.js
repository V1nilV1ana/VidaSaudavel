const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require("./Models/User")

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user){
            done(err, user)
        })
    })

    passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err) {return done(err)}
            if(!user){
                return done(null, false, {message: 'usuarios incoreto'})
            }
            bcrypt.compare.user.password, function(err, res){
                if(err) {return done(err)}

                if(res=== false){
                    return done(null, false, {message: 'senha incorreta'})
                }

                return done(null, user)
            }
        })
    }))
module.exports = initialize