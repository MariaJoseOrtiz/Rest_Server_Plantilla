const JWT = require('jsonwebtoken')
const {Usuario}=require('../models')

const generarJWT =(uid='')=>{

  return new Promise((resolve,reject)=>{
    const payload={uid};
    JWT.sign(payload, process.env.SECRETOPRIVATEKEY,{
      expiresIn: '4h'
    },(err,token)=>{
      if(err){
        console.log(err);
        reject('No se pudo generar el token')
      }else{
        resolve(token);
      }
    })
  })
}

const comprobarJWT =async(token='')=>{

  try{
    if(token.length< 10){
      return null;
    }

      const { uid }= JWT.verify(token,process.env.SECRETOPRIVATEKEY)
      const usuario= await Usuario.findById(uid);

      console.log(usuario)

      if(usuario){
        return usuario;
      }else{
        return null;
      }
    
  }catch(error){
    console.log("algo paso ",error)
    return null;
  }
}

module.exports = {
  generarJWT,
  comprobarJWT
}