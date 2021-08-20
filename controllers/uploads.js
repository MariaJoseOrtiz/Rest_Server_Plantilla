const path = require('path')
const fs = require('fs')
const {response}=require('express')
const {subirArchivo}= require('../helpers')
const {Producto,Usuario }=require('../models')

const cargarArchivo = async(req,res =response)=>{

  
    try{

        const nombre = await  subirArchivo(req.files,undefined,'imgs');
    
        res.json({
            nombre
        })

    }catch(msg){
        res.status(400).json({ msg});
    }
}

const actualizarImagen=async(req,res =response)=>{

    const {coleccion,id}= req.params;
     
    let modelo;
    
    switch(coleccion){
       case 'usuarios':
           console.log("soy usuario")
        modelo= await Usuario.findById(id)
        if(!modelo){
            return res.status(400).json({
                msg:'No existe un usuario con ese id  '
            });

        }
        break;
        case 'productos':
            console.log('soy un producto')
        modelo= await Producto.findById(id)
        if(!modelo){
            return res.status(400).json({
                msg:'No existe un producto con ese id  '
            });
            
        }
        break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'})
    }

     // Limpiar imagenes previas 
     if(modelo.img){
         //borrar imagen
         const pathImagne = path.join(__dirname, '../uploads',coleccion,modelo.img);
         if(fs.existsSync(pathImagne)){
            fs.unlinkSync(pathImagne);
         }
     }
   
    const nombre = await subirArchivo(req.files,undefined,coleccion)
    modelo.img = nombre;
    
    await modelo.save()

     res.json(modelo)

}

const mostrarImagen =async(req,res =response)=>{

    const {coleccion,id}= req.params;

    let modelo;
    
    switch(coleccion){
       case 'usuarios':
           console.log("soy usuario")
        modelo= await Usuario.findById(id)
        if(!modelo){
            return res.status(400).json({
                msg:'No existe un usuario con ese id  '
            });

        }
        break;
        case 'productos':
            console.log('soy un producto')
        modelo= await Producto.findById(id)
        if(!modelo){
            return res.status(400).json({
                msg:'No existe un producto con ese id  '
            });
            
        }
        break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'})
    }
    if(modelo.img){
        //borrar imagen
        const pathImagne = path.join(__dirname, '../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagne)){
           return res.sendFile(pathImagne)
        }
    }

    const pathImagne = path.join(__dirname, '../assets/no-image.jpg')
    return res.sendFile(pathImagne);

    

}

module.exports={
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}