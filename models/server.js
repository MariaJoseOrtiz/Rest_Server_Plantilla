const express = require('express');
const cors=require('cors');
const { dbConnection } = require('../database/config');

class Server{

  constructor(){
    this.app = express();
    this.port=process.env.PORT;
    this.paths={
      usuarios: '/api/usuarios',
      auth:'/api/auth',
      categorias:'/api/categorias'
    }
    this.database();
    this.middlewares();
    this.routes();
  }
  async database(){
    await dbConnection();
  }
  middlewares(){

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    
  }
  routes(){
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.usuarios, require('../routes/user'));
    this.app.use(this.paths.categorias, require('../routes/categorias'));
  }
  listen(){
    this.app.listen(this.port, ()=>{
      console.log(`Servidor corriendo en el puerto ${this.port}`)
    });
  }



}
module.exports=Server;