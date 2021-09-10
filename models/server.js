const express = require('express');
const cors=require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload')
const {socketController}= require('../sockets/controller')
class Server{

  constructor(){
    this.app = express();
    this.port=process.env.PORT;
    this.server= require("http").createServer(this.app)
    this.io= require('socket.io')(this.server)

    this.paths={
      usuarios: '/api/usuarios',
      auth:'/api/auth',
      categorias:'/api/categorias',
      productos:'/api/productos',
      buscar:'/api/buscar',
      uploads:'/api/uploads'

    }
    this.database();
    this.middlewares();
    this.routes();
    this.sockets();
  }
  async database(){
    await dbConnection();
  }
  middlewares(){

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    //carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath:true
    }));
    
  }
  routes(){
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.usuarios, require('../routes/user'));
    this.app.use(this.paths.categorias, require('../routes/categorias'));
    this.app.use(this.paths.productos, require('../routes/productos'));
    this.app.use(this.paths.buscar, require('../routes/buscar'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
  }

  sockets(){
    
    this.io.on("connection", (socket)=> socketController(socket,this.io))
  
  }


  listen(){
    this.server.listen(this.port, ()=>{
      console.log(`Servidor corriendo en el puerto ${this.port}`)
    });
  }



}
module.exports=Server;