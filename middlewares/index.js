
const validaRoles= require('../middlewares/validar-roles')
const validarCampos=require('../middlewares/validar-campos')
const  validarJWT= require('../middlewares/validar-jwr')
const validarArchivo= require('./validar-archivo')

module.exports={
  ...validarCampos,
  ...validarJWT,
  ...validaRoles,
  ...validarArchivo
}