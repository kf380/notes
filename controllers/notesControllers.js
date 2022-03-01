const Notas = require("../models/Notas")


// //Obtener notas
// router.get('/',getNotas)
// //Crear una nueva notas
// router.post('/',crearNota)
// //Actualizar notas
// router.put('/:id',actualizarNota)
// //Eliminar notas
// router.delete('/:id',eliminarNota)

const getNotas= async(req,res)=>{

    const notas = await Notas.find()

    res.json({
        ok:true,
        notas
    })
    
}
const crearNotas=async(req,res)=>{

    const notas = new Notas(req.body)

    try{

       const notasGuardadas = await notas.save()


        res.status(201).json({
            ok:true,
            notas:notasGuardadas
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}
const actualizarNota=async(req,res)=>{

    const notaId = req.params.id;


    try{

        const nota = Notas.findById(notaId)

        if(!nota){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        const nuevaNota ={
            ...req.body
        }

        const notaActualizada = await Notas.findByIdAndUpdate(notaId,nuevaNota,{new:true})  //Este ultimo argumento de new:true es porque quiero que retorne los datos actualizados que recien inserte

        res.json({
            ok:true,
            nota:notaActualizada
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}
const eliminarNota=async(req,res)=>{
    const notaId = req.params.id;


    try{

        const nota = Notas.findById(notaId)

        if(!nota){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

     

        await Notas.findByIdAndDelete(notaId)  

        res.json({
            ok:true,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

module.exports={
    getNotas,
    crearNotas,
    actualizarNota,
    eliminarNota
}