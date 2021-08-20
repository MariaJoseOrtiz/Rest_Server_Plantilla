

const dbValidators = require('./db-validators')
const generiarJWT = require('./generiar-jwt')
const googleVerify= require('./google-verify')
const subirArchivo= require('./subir-archivo')


module.exports={
    ...dbValidators,
    ...generiarJWT,
    ...googleVerify,
    ...subirArchivo
}