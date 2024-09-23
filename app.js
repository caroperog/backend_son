//definir la configuración del servidor,  todo lo que sea manipulación e implementación 
const express = require('express'); //montar el servidor con express 
global.app = express(); // global para verla en todo. = para que se ejecute la funcionalidad 
global.config = require("./config.js").config // la variable config queda con todo los valores que estan configurados. 
global.categorias = [{}]
global.empleados = [{ cedula: "0001", nombre: "Cesar", apellido: "Ropero",  estado: "true" }]

var bodyParser = require('body-parser') //para capturar los datos que vienen en camino. con esto se puede recibir elementos por la parte del body con elementos post
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

//conexión de la base de datos MongoDB con mongoose: 
const mongoose = require("mongoose");

//se concatena con el nombre de la base de datos, ubicado en config. la URL es la de cmd y colocar mongosh y ahí sale la URL  versión 5 de mongoose, {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then(
    () => console.log('connected!')
).catch((error) => {  //envia un error si se cae la base de datos
    console.log(error)
})
/* const { config } = require('./config.js'); */
//para el uso de cors, esto es para que los servidores tengan comunicación 
var cors = require("cors");

app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true)
        
        if(config.origin.indexOf(origin) === -1 ){
            return this.callback('error de cors',false)
        }
        return callback(null,true)
    }
}))

require("./routes.js"); //el codigo de routes existiera en esta linea en adelante. vinculación.  

//para enlazar con el frontend
app.use('/', express.static(__dirname + '/Pagina'))


// servidor con el puerto.
app.listen(config.puerto, function () {
    console.log("Servidor funcionando por el puerto " + config.puerto)
})

/* 1. cuando se monta el servidor en app y config
2. se monta las rutas  
3. se realiza el enlace de la ruta y el controlador 
4. se hace la ruta entre el controlador y el modelo 
5. se configura mongo en el modelo. 




*/