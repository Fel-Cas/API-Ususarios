const CONFIG=require('../config/config');
const User=require('../models/usuario');
const jwt=require('jsonwebtoken');

exports.login=async(req,res)=>{
    let usuario=req.body.usuario;
    let contrasena=req.body.contrasena;
    let user= await User.findOne({usuario:usuario})||await User.findOne({correo:usuario});
    if(!user){
        return res.status(404).send({message:'El usuario no existe'});
    }
    if(!await User.compararContrasena(contrasena,user.contrasena)){
        return res.status(401).send({token:null,message:'Contraseña incorrecta'});
    }
    let datos={
        id:user._id,
        nombres:user.nombres,
        apellidos:user.apellidos,
        correo:user.correo
    }    
    const token=jwt.sign(datos,CONFIG.SECRET_TOKEN,{
        expiresIn:86400
    });
    res.status(200).send({token:token,id:datos.id,nombres:datos.nombres,apellidos:datos.apellidos,message:'Acceso concedido'});

}