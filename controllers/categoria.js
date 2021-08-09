const { response } = require("express");
const {Categoria}=require('../models')

const optenerCategorias = async(req,res = response)=>{
  try{
  const {limite = 5, desde = 0} = req.query;
  const query = {estado: true}

  const [total,categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find({estado: true})
    .populate('usuario','nombre')
    .skip(Number(desde))
    .limit(Number(limite))
    
  ])

    res.json({
        total,
        categorias
      });
  }catch(e){
      throw e 
  }
}

const crearCategoria=async(req,res=response)=>{

  console.log("haciendo algo ")
  const nombre= req.body.nombre.toUpperCase();
  const categoriaDB= await Categoria.findOne({nombre})

  if(categoriaDB){
    return res.json(400).json({
      msg:`La categoria ${categoriaDB} ya existe`
    })
  }
  const data={
    nombre,
    usuario:req. usuario._id
  }
  const categoria= new Categoria(data);

 await  categoria.save()

 res.json(categoria)
}

module.exports={
  crearCategoria,
  optenerCategorias
}