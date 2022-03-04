const {Schema, model} = require('mongoose')

const NotaSchema = Schema({
    title:{
        type: String,

    },
    image:{
        type:String,
    },
    text:{
        type:String,
    
    }
})

NotaSchema.method('toJSON', function(){
    const {__v,_id,...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Notas', NotaSchema);