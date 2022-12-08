const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
        },
    password:{
        type: String,
        require: true,
    },
    passwordResetToken:{
        type:String,
        
    },
    passwordResetExpires:{
        type: Date,
        default: Date.now(),
    }
}, {timestamps: true})

const CadUser = mongoose.model('CadUser', userSchema)
module.exports = CadUser


