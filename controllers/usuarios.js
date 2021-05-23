const {response, query}=require('express');
const Usuario =require('../models/usuario')
const bcryptjs=require('bcryptjs')
const {validationResult}=require('express-validator');

const usuariosGet = (req, res = response)=> {

  const params=req.query;

  res.json({
    msg:'controlador get',
    query:params
  });
}

const usuariosPost = async(req, res = response)=> {


  const {nombre,correo,password,rol} = req.body;
  const usuario = new Usuario({nombre,correo,password,rol});

  //verificar si el correo existe
  

  //hacer hash
  const salt = bcryptjs.genSaltSync();
  usuario.password=bcryptjs.hashSync(password,salt);

  //guardar en base de datos 
  await usuario.save();

  res.json({
    msg:'post API',
    usuario:usuario
  });
}

const usuariosPut = async(req, res = response)=> {
  
  const {id}= req.params;
  console.log(id)
  console.log(req.boby)
  const {password,google,correo,...resto}=req.boby;
  //todo validar contra base de datos
  if(password){
    const salt = bcryptjs.genSaltSync();
    resto.password=bcryptjs.hashSync(password,salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id,resto);

  res.json({
    msg:'controlador put',
    id
  })
}

const usuariosDelete= (req, res = response)=> {
  
  res.json('controlador delete');
}

const usuariosPatch = (req, res = response)=> {
  
  res.json('controlador patch');
}


module.exports={
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
}