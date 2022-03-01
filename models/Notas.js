const {Schema, model} = require('mongoose')

const NotaSchema = Schema({
    title:{
        type: String,
        required: true,
    },
    image:{
        type:String,
        required: true
    },
    text:{
        type:String,
        required: true
    }
})

NotaSchema.method('toJSON', function(){
    const {__v,_id,...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Notas', NotaSchema);