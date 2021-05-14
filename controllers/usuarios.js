const {response, query}=require('express');

const usuariosGet = (req, res = response)=> {

  const params=req.query;

  res.json({
    msg:'controlador get',
    query:params
  });
}

const usuariosPost = (req, res = response)=> {

  const body = req.body;
  
  res.json({
    msg:'post API',
    boby: body
  });
}

const usuariosPut = (req, res = response)=> {
  

  const {id}= req.params;
  res.json({
    msg:'controlador put',
    id
  })
}

const usuariosDelete= (req, res = response)=> {
  
  res.json('controlador delete');
}

const usuariosPatch = (req, res = response)=> {
  
  res.json('controlador patch');
}


module.exports={
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
}