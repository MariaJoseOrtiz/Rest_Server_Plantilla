const {Router}=require('express');
const {check}=require('express-validator');
const { crearCategoria ,optenerCategorias} = require('../controllers/categoria');
const { validarJWT } = require('../middlewares');
const {validarCampos}=require('../middlewares/validar-campos')

const router = Router();

//Obtener todas las categorias
router.get('/',optenerCategorias)

//Obtener una categorias
router.get('/:id',(req,res)=>{
  res.json('get-id')
})

//Crear categoria - privado- cualquier persona con un token valido
router.post('/',[
  validarJWT,
  check("nombre",'El nombre es obligatorio').not().isEmpty(),
  validarCampos
],crearCategoria);

//actualizar
router.put('/:id',(req,res)=>{
  res.json('put - id ')
})
//delete
router.delete('/:id',(req,res)=>{
  res.json('delete')
})

module.exports = router;