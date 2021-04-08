//Importamos los modulos necesarios
const express=require('express');
const router=express.Router();
const usuarioController=require('../controllers/usuarioController');
const token=require('../middleware/token');

router.get('/',usuarioController.obtenerUsuarios);
router.get('/:username',usuarioController.obtenerUsuario);
router.post('/',usuarioController.crearUsuario);
router.put('/:username',token.validartoken,usuarioController.actualizarUsuario);
router.delete('/:username',token.validartoken,usuarioController.eliminarUsuario);


module.exports=router;