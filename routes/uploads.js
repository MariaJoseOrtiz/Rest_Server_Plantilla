const {Router}=require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen ,mostrarImagen} = require('../controllers/uploads');
const {validarCampos,validarArchivo}=require('../middlewares');
const {coleccionesPermitidas}=require('../helpers/db-validators');


const router = Router();
router.get('/:coleccion/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)

router.post('/',cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagen)


module.exports = router;