//se enlaza la ruta del modelo en el controlador
var tagsModel = require("../modelos/tagsModel.js").tagsModel

var tagsController = {}

//todo lo que sea almacenamiento, validación se hace con: 
tagsController.save = function (request, response) {

    var post = {
        codigo: request.body.codigo,  //.body es para capturar los parametros con el metodo post
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    console.log("---->") //para ver por donde pasa el codigo
    console.log(post)//para ver lo que está llegando 
    if (post.codigo == undefined || post.codigo == null || post.codigo == "") {
        response.json({ state: false, mensaje: "El campo codigo de tag es obligatorio", nombrecampo: "codigo" })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio", nombrecampo: "nombre" })
        return false
    }
    if (post.estado == undefined || post.estado == null || post.estado == "") {
        response.json({ state: false, mensaje: "El campo estado es obligatorio", nombrecampo: "estado" })
        return false
    }

    //cuando se ingresa, es un string, se debe pasar a booleano. Cuando el estado es = a true o false sting, se asigna en booleano. 
    if (post.estado.toLocaleLowerCase() == "true") {
        post.estado = true
    }
    if (post.estado.toString().toLocaleLowerCase() == "false") { // se pasa a sting y despues a minuscula, ya que anteriormente ya se está pasando a booleano
        post.estado = false
    }

    if (typeof post.estado != "boolean") {
        response.json({ state: false, mensaje: "El campo estado debe ser true o false" })
        return false
    }

    /*   if([true, false].findIndex((item) => item == post.estado) == -1 ){
          response.json({ state:false, mensaje: "El campo estado debe ser true o false" })
          return false
      }
    este es otro metodo de busqueda para valores especificos, puede ser con "a" y "b" en el array en vez de true o false*/
    //buscando si existe
    tagsModel.buscarCodigo(post, function (resultado) { //la variable post es donde contiene todos los datos, codigo, nombre, estado
        if (resultado.posicion == -1) {
            //crea producto, porque no existe 
            tagsModel.crear(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "elemento creado correctamente" })
                    return false
                } else {
                    response.json({ state: false, mensaje: "Error al guardar" })
                    return false
                }
            })
        }
        else {
            response.json({ state: false, mensaje: "El codigo del tag ya existe" })
            return false
        }
    })



}

tagsController.list = function (request, response) {
    tagsModel.list(null, function (respuesta) {
        response.json(respuesta)
    })
}

//busqueda por criterio de busqueda.
tagsController.listId = function (request, response) {
    var post = {
        _id: request.body._id,

    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id del tag es obligatorio", campo: "_id" })
        return false
    }
    tagsModel.listId(post, function (respuesta) {
        response.json(respuesta)
    })
}

//actualización de tags. Las validaciones que se solicitan en el crear, son las mismas de actualizar normalmente.
tagsController.update = function (request, response) {
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id del tag es obligatorio", campo: "_id" })
        return false
    }


    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio", campo: "nombre" })
        return false
    }
    if (post.estado == undefined || post.estado == null || post.estado == "") {
        response.json({ state: false, mensaje: "El campo estado es obligatorio", campo: "estado" })
        return false
    }

    tagsModel.update(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizó el elemento correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "se presentó un error al actualizar el elemento", error: respuesta })
        }
    })



}

//para borrar, es lo mismo que el update, pero solo con el ID.

tagsController.delete = function (request, response) {
    var post = {
        _id: request.body._id,

    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id del tag es obligatorio", campo: "_id" })
        return false
    }



    tagsModel.delete(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se eliminó el elemento correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "se presentó un error al eliminar el elemento", error: respuesta })
        }
    })



}








module.exports.tags = tagsController