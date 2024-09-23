// en este archivo se definen las configuraciones del aplicativo. }

var config = {} //es igual a un objeto

config.puerto = 3000
config.bd = "sonbd" //nombre de la base de datos
config.origin = [  //para presentarle al servidor que va a tener comunicación.
    "http://localhost:4200"
]


module.exports.config = config