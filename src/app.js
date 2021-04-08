const express=require('express');
const morgan =require('morgan');
const pkg=require('../package.json');
const routerUsuario=require('./routes/usuario');
const conectarBD=require('./config/database');
const cors=require('cors');
const routerAuth=require('./routes/auth');

const app=express();

conectarBD();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/usuario',routerUsuario);
app.use('/api/auth',routerAuth);
module.exports= app;