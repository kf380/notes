/*
    Rutas de Usuarios/Auth
    host + /api/notes
*/

const {Router} = require("express");
const { getNotas, crearNotas, actualizarNota, eliminarNota } = require("../controllers/notesControllers");
const router = Router()


// Creo la ruta para la creacion de notas

//Obtener notas
router.get('/',getNotas)
//Crear una nueva notas
router.post('/',crearNotas)
//Actualizar notas
router.put('/:id',actualizarNota)
//Eliminar notas
router.delete('/:id',eliminarNota)

module.exports=router;