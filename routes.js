/* tabla maestra a nivel de rutas */
var nominaController = require("./api/controladores/nominaController.js").nomina //enlazado con el controlador. routes debe apuntar al controlador


//aplicación tipo post. 

app.post("/nomina/save", function (request, response) {
    nominaController.save(request, response) //Invocando la funcionalidad
}) 

app.post("/nomina/list", function (request, response) {
    nominaController.list(request, response) //Invocando la funcionalidad
}) 

app.post("/nomina/listId", function (request, response) {
    nominaController.listId(request, response) //Invocando la funcionalidad
}) 

app.post("/nomina/update", function (request, response) {
    nominaController.update(request, response) //Invocando la funcionalidad
}) 

app.post("/nomina/delete", function (request, response) {
    nominaController.delete(request, response) //Invocando la funcionalidad
}) 

var empleadosController = require("./api/controladores/empleadosController.js").empleados //enlazado con el controlador. routes debe apuntar al controlador


//aplicación tipo post. 

app.post("/empleados/save", function (request, response) {
    empleadosController.save(request, response) //Invocando la funcionalidad
}) 

app.post("/empleados/list", function (request, response) {
    empleadosController.list(request, response) //Invocando la funcionalidad
}) 

app.post("/empleados/listId", function (request, response) {
    empleadosController.listId(request, response) //Invocando la funcionalidad
}) 

app.post("/empleados/update", function (request, response) {
    empleadosController.update(request, response) //Invocando la funcionalidad
}) 

app.post("/empleados/delete", function (request, response) {
    nominaController.delete(request, response) //Invocando la funcionalidad
}) 



var tagsController = require("./api/controladores/tagsController.js").tags //enlazado con el controlador. routes debe apuntar al controlador
//aplicación tipo post. 

app.post("/tags/save", function (request, response) {
    tagsController.save(request, response) //Invocando la funcionalidad
})  

app.get("/tags/list", function (request, response) {
    tagsController.list(request, response) //Invocando la funcionalidad
}) 

app.get("/tags/listId", function (request, response) {
    tagsController.listId(request, response) //Invocando la funcionalidad
}) 

app.put("/tags/update", function (request, response) {
    tagsController.update(request, response) //Invocando la funcionalidad
}) 

app.delete("/tags/delete", function (request, response) {
    empleadosController.delete(request, response) //Invocando la funcionalidad
}) 


var usuariosController = require("./api/controladores/usuariosController.js").usuarios //enlazado con el controlador. routes debe apuntar al controlador
//aplicación tipo post. 

app.post("/usuarios/save", function (request, response) {
    usuariosController.save(request, response) //Invocando la funcionalidad
})  

app.get("/usuarios/list", function (request, response) {
    usuariosController.list(request, response) //Invocando la funcionalidad
}) 

app.get("/usuarios/listId", function (request, response) {
    usuariosController.listId(request, response) //Invocando la funcionalidad
}) 

app.put("/usuarios/update", function (request, response) {
    usuariosController.update(request, response) //Invocando la funcionalidad
}) 

app.delete("/usuarios/delete", function (request, response) {
    usuariosController.delete(request, response) //Invocando la funcionalidad
}) 

app.post("/usuarios/login", function (request, response) {
    usuariosController.login(request, response) //Invocando la funcionalidad
}) 