const mongoose=require('mongoose');
const  bcrypt=require('bcryptjs');

const usuarioShema=mongoose.Schema({
    usuario:{
        type: String,
        unique: true
    },
    nombres:{
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true,
        unique: true
    },
    contrasena:{
        type: String,
        required: true
    },
    celular:{
        type:String,
        require:true
    },
    cuenta:{
        type:String,
        require:true
    }

    
});

usuarioShema.pre('save', function(next) {

    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.contrasena, salts).then(hash => {
            this.contrasena = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));

});

usuarioShema.statics.encriptarContrasena = async (contrasena) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contrasena, salt);
  };
  
usuarioShema.statics.compararContrasena = async (contrasena, contrasenaEntrada) => {
    return await bcrypt.compare(contrasena, contrasenaEntrada);
  }

const usuario=mongoose.model('usuarios',usuarioShema);
module.exports=usuario;