//se enlaza la ruta del modelo en el controlador
var nominaModel = require("../modelos/nominaModel.js").nominaModel

var nominaController = {}

//todo lo que sea almacenamiento, validación se hace con: 
nominaController.save = function (request, response) {

    var post = {
        codigo: request.body.codigo,  //.body es para capturar los parametros con el metodo post
        nombre: request.body.nombre,
        contrato: request.body.contrato,
        salario: request.body.salario,
        estado: request.body.estado
    }

    console.log("---->") //para ver por donde pasa el codigo
    console.log(post)//para ver lo que está llegando 
    if (post.codigo == undefined || post.codigo == null || post.codigo == "") {
        response.json({ state: false, mensaje: "El campo codigo del contrato es obligatorio", nombrecampo: "codigo" })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "El campo nombre del contrato es obligatorio", nombrecampo: "nombre" })
        return false
    }

    if (post.contrato == undefined || post.contrato == null || post.contrato == "") {
        response.json({ state: false, mensaje: "El campo tipo del contrato es obligatorio", nombrecampo: "contrato" })
        return false
    }

    if (post.salario == undefined || post.salario == null || post.salario == "") {
        response.json({ state: false, mensaje: "El campo salario es obligatorio", nombrecampo: "salario" })
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == "") {
        response.json({ state: false, mensaje: "El campo estado es obligatorio", nombrecampo: "estado" })
        return false
    }

    //cuando se ingresa, es un string, se debe pasar a booleano. Cuando el estado es = a true o false sting, se asigna en booleano. 
    // Verifica que post.estado sea una cadena antes de aplicar toLocaleLowerCase
    if (typeof post.estado === 'string') {
        if (post.estado.toLocaleLowerCase() === 'true') {
            post.estado = true;
        } else if (post.estado.toLocaleLowerCase() === 'false') {
            post.estado = false;
        }
    } else {
        // Maneja el caso donde post.estado no sea un string (por ejemplo, un booleano u otro tipo)
        if (post.estado === true || post.estado === false) {
            // post.estado ya es booleano, no hace falta convertirlo
        } else {
            response.json({ state: false, mensaje: "El campo estado debe ser true o false" });
            return false;
        }
    }


    /*   if([true, false].findIndex((item) => item == post.estado) == -1 ){
          response.json({ state:false, mensaje: "El campo estado debe ser true o false" })
          return false
      }
    este es otro metodo de busqueda para valores especificos, puede ser con "a" y "b" en el array en vez de true o false*/
    //buscando si existe
    nominaModel.buscarCodigo(post, function (resultado) { //la variable post es donde contiene todos los datos, cedula, nombre, estado
        if (resultado.posicion == -1) {
            //crea empleado, porque no existe 
            nominaModel.crear(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "codigo creada" })
                    return false
                } else {
                    response.json({ state: false, mensaje: "Error en la creación" })
                    return false
                }
            })
        }
        else {
            response.json({ state: false, mensaje: "El codigo interno del empleado ya existe" })
            return false
        }
    })



}

nominaController.list = function (request, response) {
    nominaModel.list(null, function (respuesta) {
        response.json(respuesta)
    })
}

//busqueda por criterio de busqueda.
nominaController.listId = function (request, response) {
    var post = {
        _id: request.body._id,

    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id del codigo interno del empleado es obligatorio", campo: "_id" })
        return false
    }
    nominaModel.listId(post, function (respuesta) {
        response.json(respuesta)
    })
}

//actualización de nomina. Las validaciones que se solicitan en el crear, son las mismas de actualizar normalmente.
nominaController.update = function (request, response) {
    var post = {
        _id: request.body._id,
        
        nombre: request.body.nombre,
        contrato: request.body.contrato,
        salario: request.body.salario,
        estado: request.body.estado
    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id interno del empleado es obligatorio", campo: "_id" })
        return false
    }
    
    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio", campo: "nombre" })
        return false
    }

    if (post.contrato == undefined || post.contrato == null || post.contrato == "") {
        response.json({ state: false, mensaje: "El campo contrato es obligatorio", campo: "contrato" })
        return false
    }

    
    if (post.salario == undefined || post.salario == null || post.salario == "") {
        response.json({ state: false, mensaje: "El campo salario es obligatorio", campo: "salario" })
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == "") {
        response.json({ state: false, mensaje: "El campo estado es obligatorio", campo: "estado" })
        return false
    }

    nominaModel.update(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizó el elemento correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "se presentó un error al actualizar el elemento", error: respuesta })
        }
    })



}

//para borrar, es lo mismo que el update, pero solo con el ID.

nominaController.delete = function (request, response) {
    var post = {
        _id: request.body._id,

    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id del elemento es obligatorio", campo: "_id" })
        return false
    }



    nominaModel.delete(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se eliminó el elemento correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "se presentó un error al eliminar el elemento", error: respuesta })
        }
    })



}








module.exports.nomina = nominaController