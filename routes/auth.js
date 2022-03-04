/*
    Rutas de Usuarios/Auth
    host + /api/auth
*/

// Creo la ruta para la creacion de usuarios

const {Router} = require("express");
const { crearUsuario, loginUsuario } = require("../controllers/authControllers");
const router = Router()


router.post('/new', crearUsuario)
router.post('/',loginUsuario)

module.exports = router;