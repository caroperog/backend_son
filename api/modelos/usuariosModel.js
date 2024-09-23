var usuariosModel = {}
const mongoose = require("mongoose") // se configura mongo en el modelo. 
const Schema = mongoose.Schema // se configura el esquema, el nombre y el tipo de dato. base de datos 

// configuración del esquema de la base de datos.
var usuariosSchema = new Schema({
    email: String,
    password: String,
    nombre: String,
    estado: Boolean
})

//modelado de la información. es la creación de la colección. BD 

const myModel = mongoose.model('usuarios', usuariosSchema) //nombre de la colección "prodcutos " y se le asigna el nombre del esquema

//funcionalidad de buscar producto. 
usuariosModel.buscarCodigo = function (post, callback) {
    //proceso de busqueda en la BD. then = promesas
    myModel.find({ codigo: post.email }, { nombre: 1, email: 1, estado: 1 }).then((respuesta) => { // el primer {} es el criterio de busqueda y despues la proyección. Buscar el email a ver si existe 
        console.log(respuesta)
        if (respuesta.length == 0) {
            return callback({ posicion: -1 })
        } else {
            return callback ({ posicion: respuesta.length})
        }
    }).catch((error) => {  //envia un error 
        console.log(error) //para que quede en la consola, la posibilidad del error que quedó
        return callback({posicion:0 ,state: false, mensaje:error})
    })


    /*  var posicion = usuarios.findIndex((item) => item.email == post.email)
     return callback({ posicion: posicion })  *///devolver la posición. mandar un dato y la función retorna el dato. Posición (1) esta devolviendo un objeto con la posición (2) que encontró
}
//metodo de buscar general
usuariosModel.list = function(post, callback){
    //cuando se trae información, no se trae validación de datos. solo busqueda.
    myModel.find({}, {password:0}).then((respuesta) =>{ //criterio de busqueda y proyección. 
        return callback({state: true, data: respuesta})
    }) 
}
//metodo de buscar por criterio
usuariosModel.listId = function(post, callback){
    //cuando se trae información, no se trae validación de datos. solo busqueda.
    myModel.find({_id:  post._id}, {password:0}).then((respuesta) =>{ //criterio de busqueda y proyección. 
        return callback({state: true, data: respuesta})
    }) 
}

//crear producto
usuariosModel.crear = function (post, callback) {
    // se crea la instancia, que es preparar los datos, respecto al modelo. Se crea una instancia basada en el modelo y se agregan los datos.
    const instancia = new myModel
     instancia.email = post.email
     instancia.password = post.password
     instancia.nombre = post.nombre
     instancia.estado = post.estado

    //para guardar
    instancia.save().then((respuesta) =>{
       return callback ({state:true})
    }).catch((error) => {  //envia un error 
        console.log(error) //para que quede en la consola, la posibilidad del error que quedó
        return callback({state: false, mensaje:error})
    })

  /*   usuarios.push({ codigo: post.codigo, nombre: post.nombre, estado: post.estado })
    return callback({ state: true }) */
}

//actualizar
usuariosModel.update = function(post, callback) {
    myModel.updateOne({_id:post._id}, {nombre:post.nombre, estado:post.estado}).then((respuesta) =>{
        return callback ({state:true})
    }).catch((error) => {  //envia un error 
        console.log(error) //para que quede en la consola, la posibilidad del error que quedó
        return callback({state: false, mensaje:error})
    })
}

//borrar
usuariosModel.delete = function(post, callback) {
    myModel.deleteOne({_id:post._id}).then((respuesta) =>{
        return callback ({state:true})
    }).catch((error) => {  //envia un error 
        console.log(error) //para que quede en la consola, la posibilidad del error que quedó
        return callback({state: false, mensaje:error})
    })
}

usuariosModel.login = function(post, callback){
    //cuando se trae información, no se trae validación de datos. solo busqueda.
    myModel.find({email: post.email, password: post.password}, {nombre:1}).then((respuesta) =>{ //criterio de busqueda y proyección. 
        return callback({state: true, data: respuesta})
    }).catch((error) => {  //envia un error 
        console.log(error) //para que quede en la consola, la posibilidad del error que quedó
        return callback({state: false, mensaje:error})
    })
}
 
module.exports.usuariosModel = usuariosModel