const User=require('../models/usuario');
const jwt=require('jsonwebtoken');
const bycript=require('bcryptjs');

exports.crearUsuario=(req,res)=>{        
    let Usuario=new User(req.body);
    Usuario.save().then(user=>{
        return res.status(201).send({user,message:'Usuario creado correctamente'});   
    }).catch(error=>res.status(402).send({error,message:'El usuario ya existe'}));    

}
exports.obtenerUsuario=async (req,res)=>{
    let usuario= await User.findOne({usuario:req.params.username});
    if(usuario){
        return res.status(200).send({usuario});
    }
    res.status(404).send({message:'Usuario no encontrado'});
    
}

exports.obtenerUsuarios=async(req,res)=>{
    let usuarios=await User.find({});
    if(usuarios.length){
         return res.status(200).send(usuarios);
    }
    res.status(404).send({message:'No hay usuarios registrados'});
}
exports.eliminarUsuario=async(req,res)=>{
    let usuarios=await User.find({usuario:req.params.username});
    if(!usuarios){
       return res.status(404).send({message:'El usuario no existe'});
    }
    await User.findOneAndRemove({usuario:req.params.username});
    res.send({message:'Usuario eliminado'});
}
exports.actualizarUsuario=async(req,res)=>{
    let nombres=req.body.nombres,apellidos=req.body.apellidos,contrasena=req.body.contrasena;
    let user=await User.findOne({usuario:req.params.username});
    if(!user){
        return  res.status(404).send({message:'Usuario no encontrado'});
    }
    if (nombres != undefined || nombres!= "" || nombres != null) {
        user.nombres=nombres;
    }
    if (apellidos != undefined || apellidos!= "" || apellidos != null) {
        user.apellidos=apellidos;
    }
    if (contrasena != undefined || contrasena!= "" || contrasena != null) {
        user.contrasena=await User.encriptarContrasena(contrasena);
    }
     let update={
        usuario:user.usuario,
        nombres:user.nombres,
        apellidos:user.apellidos,
        correo:user.correo,
        contrasena:user.contrasena
     }
    User.updateOne({usuario:req.params.username}, update, (err, user) => {
        if (err) res.status(500).send({ message: `Error ${err}` })
        res.status(200).send({ message: "Actualizacion correcta" })
    });

}

