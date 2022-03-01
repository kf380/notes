const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    dni:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
})


module.exports = model('Usuario', UsuarioSchema);