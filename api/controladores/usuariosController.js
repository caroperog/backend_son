//se enlaza la ruta del modelo en el controlador
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel

var usuariosController = {}

//todo lo que sea almacenamiento, validación se hace con: 
usuariosController.save = function (request, response) {

    var post = {
        email: request.body.email,  //.body es para capturar los parametros con el metodo post
        password: request.body.password,
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    console.log("---->") //para ver por donde pasa el email
    console.log(post)//para ver lo que está llegando 
    if (post.email == undefined || post.email == null || post.email == "") {
        response.json({ state: false, mensaje: "El campo email es obligatorio", nombrecampo: "email" })
        return false
    }

    if (post.password == undefined || post.password == null || post.password == "") {
        response.json({ state: false, mensaje: "El campo password es obligatorio", nombrecampo: "password" })
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
    usuariosModel.buscarCodigo(post, function (resultado) { //la variable post es donde contiene todos los datos, email, nombre, estado
        if (resultado.posicion == -1) {
            //crea producto, porque no existe 
            usuariosModel.crear(post, function (respuesta) {
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
            response.json({ state: false, mensaje: "El email del usuarios ya existe" })
            return false
        }
    })



}

usuariosController.list = function (request, response) {
    usuariosModel.list(null, function (respuesta) {
        response.json(respuesta)
    })
}

//busqueda por criterio de busqueda.
usuariosController.listId = function (request, response) {
    var post = {
        _id: request.body._id,

    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id del usuarios es obligatorio", campo: "_id" })
        return false
    }
    usuariosModel.listId(post, function (respuesta) {
        response.json(respuesta)
    })
}

//actualización de usuarios. Las validaciones que se solicitan en el crear, son las mismas de actualizar normalmente.
usuariosController.update = function (request, response) {
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id del usuarios es obligatorio", campo: "_id" })
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

    usuariosModel.update(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizó el elemento correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "se presentó un error al actualizar el elemento", error: respuesta })
        }
    })



}

//para borrar, es lo mismo que el update, pero solo con el ID.

usuariosController.delete = function (request, response) {
    var post = {
        _id: request.body._id,

    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id del usuarios es obligatorio", campo: "_id" })
        return false
    }



    usuarioModel.delete(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se eliminó el elemento correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "se presentó un error al eliminar el elemento", error: respuesta })
        }
    })



}

usuariosController.login = function (request, response) {
    var post = {
        email: request.body.email,
        password: request.body.password

    }

    if (post.email == undefined || post.email == null || post.email == "") {
        response.json({ state: false, mensaje: "El campo email es obligatorio", campo: "email" })
        return false
    }
    if (post.password == undefined || post.password == null || post.password == "") {
        response.json({ state: false, mensaje: "El campo password es obligatorio", campo: "password" })
        return false
    }
    usuariosModel.login(post, function (respuesta) {

        console.log(respuesta.data.length)

        if (respuesta.state == true) {
            if (respuesta.data.length == 0) {
                response.json({ state: false, nmensaje: "error en las credenciales de acceso" })
            } else {
                response.json({ state: true, mensaje: "Bienvenido " + respuesta.data[0].nombre })
            }
        } else {
            response.json({ state: false, mensaje: "error en las credenciales de acceso" }) //error de calidad del servidor
        }
        /* response.json(respuesta) */
    })
}

module.exports.usuarios = usuariosController    