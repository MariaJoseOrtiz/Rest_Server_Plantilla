
const validaRoles= require('../middlewares/validar-roles')
const validarCampos=require('../middlewares/validar-campos')
const  validarJWT= require('../middlewares/validar-jwr')

module.exports={
  ...validarCampos,
  ...validarJWT,
  ...validaRoles
}