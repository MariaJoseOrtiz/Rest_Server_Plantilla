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
const existeUsuarioPorId =async (id)=>{

  const existeUsuario =await Usuario.findById(id);
  if(!existeUsuario){
    throw new Error(`El id no existe ${id}  `)
  }
}

module.exports ={
  esRoleValido,
  existeEmail,existeUsuarioPorId
}