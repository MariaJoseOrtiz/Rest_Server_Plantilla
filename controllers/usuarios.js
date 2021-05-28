const {response, query}=require('express');
const Usuario =require('../models/usuario')
const bcryptjs=require('bcryptjs')
const {validationResult}=require('express-validator');

const usuariosGet = async(req, res = response)=> {

  const {limite = 5, desde = 0} = req.query;

    const [total,usuarios] = await Promise.all([
      Usuario.countDocuments({estado: true}),
      Usuario.find({estado: true})
      .skip(Number(desde))
      .limit(Number(limite))
      
    ])

  res.json({
    total,
    usuarios
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

  const {password,google,correo,...resto}=req.body;
  //todo validar contra base de datos
  if(password){
    const salt = bcryptjs.genSaltSync();
    resto.password=bcryptjs.hashSync(password,salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id,resto);

  res.json({
    msg:'controlador put',
    usuario
  })
}

const usuariosDelete=async (req, res = response)=> {

  const{id}=req.params;

  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
  
  res.json({usuario });
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