
const {response}= require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const {generarJWT}= require('../helpers/generiar-jwt')

const login =async(req,res= response)=>{

  const{correo,password}=req.body
  try{
    //verificar el email
    const usuario = await Usuario.findOne({correo});
    if (!usuario){
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
      })
    }
    //si el usuario esta activo
    if(!usuario.estado){
      return res.status(400).json({
        msg:'Usuario / Password no son correctos - usuario'
      })
    }
    // verificar contrasena
    const validPassword = bcryptjs.compareSync(password,usuario.password);
    if(!validPassword){
      return res.status(400).json({
        msg:'Usuario / Password no son correctos - password'
      })
    }
    //generar el jwt
    const token = await generarJWT(usuario.id);
    res.json({
      msg:'login ok ',
      usuario,
      token
    })

  }catch(error){
    console.log(error)
    return res.status(500).json({
      msg:'Hable con el administrador'
    })
  }
  
 
}

module.exports = { login

}