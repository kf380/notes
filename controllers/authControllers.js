// Se puede utilizar express-validator para las validaciones
// Al realizar las validaciones, podemos tener las funciones en un middleware encargado de validar campos
//Agregar una contraseña y encriptarla por ejemplo con bycrypt

const Usuario = require("../models/Usuario") // Importo mi modelo de usuario



const crearUsuario = async(req, res) => {

    const {dni,password} = req.body

    // en esta parte consulto si el DNI es distinto de 8
    // de ser asi, no puede continuar, ya que el dni si o si debe de tener 8 numeros
    //   if(dni.length !==8){  
    //     return res.status(400).json({
    //         ok:false,         
    //         msg: 'El DNI tiene que tener 8 numeros'
    //     })
    // }


    try{
        let usuario = await Usuario.findOne({dni})

    //busco el usuario por dni, si existe no se puede volver a crear
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario existe con ese DNI'
            })
        }
    
  

    // Si es igual a 8, puedo continuar con la creacion de la cuenta

    usuario = new Usuario(req.body) // Me creo una nueva instancia de mi usuario, le envio todo lo que esta en el body
    // // Mongoose sabe que valores tiene, cuales son los que me interesan e ignora el resto, el cual le dije que no iba a tener

    await usuario.save()   //guardo en la base de datos, trabaja con promesas

    res.status(201).json({
        ok: true,
        uid:usuario.id,
        dni:usuario.dni
    })
}catch(error){
    console.log(error)
    res.status(500).json({
        ok:false,
        msg:'Por favor hable con el administrador'
    })
}
}

const loginUsuario = async(req,res)=>{

    const {dni,password} = req.body
    try{

        const usuario = await Usuario.findOne({dni})
        //busco el usuario por dni, si no existe se debe crear
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario no existe con ese DNI'
            })
        }



    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        })
    }



    res.json({
        ok:true,
        msg:'login',
        dni,
        password
    })
}


module.exports ={
    crearUsuario,
    loginUsuario
}