const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async(rol='')=>{

  const existeRol= await Role.findOne({rol});
  if(!existeRol){
    throw new Error(`El Rol ${rol} no esta en la BD`)
  }
}
const existeEmail= async (correo ='')=>{

  const existeEmail=await Usuario.findOne({correo:correo})
  if(existeEmail){
    throw new Error(`El correo ${correo} ya esta reqgistrado `)
  }
}

module.exports ={
  esRoleValido,
  existeEmail
}