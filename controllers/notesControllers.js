const Notas = require("../models/Notas")
const multer = require('multer');
const shortid = require('shortid');

const configMulter = {
    storage: fileStorage = multer.diskStorage({
      destination: (req,file,cb)=>{
        cb(null, __dirname+'./uploads');
      },
      filename: (req,file,cb)=>{
        const extension = file.mimetype.split('/')[1];
  
        cb(null,`${shortid.generate()}.${extension}`);
      }
    }),
    fileFilter(req,file,cb){
      if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
      }else{
        cb(null,false)
      }
    },
    limits:{fileSize:200000}
  }
  const upload = multer(configMulter).single('image');
  //subir la imagen
  exports.uploadImage = async(req,res,next)=>{
    upload(req,res, function(error){
      if(error){
        res.json({msg:error})
        return next();
      }
    });
    next();
  };

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
    const file = req.file

    try{
        if(file){
            notas.image = req.file.filename
        }

        await notas.save()


        res.json({
           msg:"Nota creada", 
           notas
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
            notaActualizada
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