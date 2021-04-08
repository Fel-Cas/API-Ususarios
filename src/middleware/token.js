const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const User =require('../models/usuario')

 exports.validartoken= async (req,res,next)=>{
    const token=req.headers['x-access-token'];
    console.log(token);
    if(!token) return res.status(403).send({message:'No hay token'})
    
    const contenido=jwt.verify(token,CONFIG.SECRET_TOKEN)
    console.log(contenido);
    
    const user= await User.findById(contenido.id);
    if(!user)return res.status(404).send({message:'Usuario no encontrado'});
    
    next();
 }