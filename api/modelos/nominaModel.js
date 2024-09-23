var nominaModel = {}
const mongoose = require("mongoose") // se configura mongo en el modelo. 
const Schema = mongoose.Schema // se configura el esquema, el nombre y el tipo de dato. base de datos 

// configuración del esquema de la base de datos.
var nominaSchema = new Schema({
    codigo: String,
    nombre: String,
    contrato: String,
    salario: String,
    estado: Boolean
})

//modelado de la información. es la creación de la colección. BD 

const myModel = mongoose.model('nomina', nominaSchema) //nombre de la colección "prodcutos " y se le asigna el nombre del esquema

//funcionalidad de buscar producto. 
nominaModel.buscarCodigo = function (post, callback) {
    //proceso de busqueda en la BD. then = promesas
    myModel.find({ codigo: post.codigo }, {  codigo: 1, nombre: 1, contrato: 1, salario: 1, estado: 1 }).then((respuesta) => { // el primer {} es el criterio de busqueda y despues la proyección. Buscar el codigo a ver si existe 
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


    /*  var posicion = nomina.findIndex((item) => item.codigo == post.codigo)
     return callback({ posicion: posicion })  *///devolver la posición. mandar un dato y la función retorna el dato. Posición (1) esta devolviendo un objeto con la posición (2) que encontró
}
//metodo de buscar general
nominaModel.list = function(post, callback){
    //cuando se trae información, no se trae validación de datos. solo busqueda.
    myModel.find({}, {}).then((respuesta) =>{ //criterio de busqueda y proyección. 
        return callback({state: true, data: respuesta})
    }) 
}
//metodo de buscar por criterio
nominaModel.listId = function(post, callback){
    //cuando se trae información, no se trae validación de datos. solo busqueda.
    myModel.find({_id:  post._id}, {}).then((respuesta) =>{ //criterio de busqueda y proyección. 
        return callback({state: true, data: respuesta})
    }) 
}

//crear producto
nominaModel.crear = function (post, callback) {
    // se crea la instancia, que es preparar los datos, respecto al modelo. Se crea una instancia basada en el modelo y se agregan los datos.
    const instancia = new myModel
     instancia.codigo = post.codigo
     instancia.nombre = post.nombre
     instancia.contrato = post.contrato
     instancia.salario = post.salario
     instancia.estado = post.estado

    //para guardar
    instancia.save().then((respuesta) =>{
       return callback ({state:true})
    }).catch((error) => {  //envia un error 
        console.log(error) //para que quede en la consola, la posibilidad del error que quedó
        return callback({state: false, mensaje:error})
    })

  /*   nomina.push({ codigo: post.codigo, nombre: post.nombre, estado: post.estado })
    return callback({ state: true }) */
}

//actualizar
nominaModel.update = function(post, callback) {
    myModel.updateOne({_id:post._id}, {nombre:post.nombre, contrato:post.contrato, apellido:post.salario, estado:post.estado}).then((respuesta) =>{
        return callback ({state:true})
    }).catch((error) => {  //envia un error 
        console.log(error) //para que quede en la consola, la posibilidad del error que quedó
        return callback({state: false, mensaje:error})
    })
}

//borrar
nominaModel.delete = function(post, callback) {
    myModel.deleteOne({_id:post._id}).then((respuesta) =>{
        return callback ({state:true})
    }).catch((error) => {  //envia un error 
        console.log(error) //para que quede en la consola, la posibilidad del error que quedó
        return callback({state: false, mensaje:error})
    })
}


module.exports.nominaModel = nominaModel