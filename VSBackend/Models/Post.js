//mudado do original
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    titulo:{
        type: String,
        require: true
    },
    nota:{
        type: Number,
        require: true
    },
    conteudo:{
        type: String,
        require: true
    }
}, {timestamps: true})

const Postreview = mongoose.model('Postreview', postSchema)
module.exports = Postreview