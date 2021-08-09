

const {Schema,model}=require('mongoose')

const CategoriaShema = Schema({
    nombre:{
      type: String,
      require:[true,'El nombre es obligatorio']
    },
    estado:{
      type: Boolean,
      default:true,
      requited: true,

    },
    usuario:{
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      requited: true,
    }
});

module.exports= model('Categoria', CategoriaShema)