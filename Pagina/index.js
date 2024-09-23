var datamensajes = [] //almacenamiento de mensajes 

var mensajeria = function (tipo, mensaje) { //para que pinte y elimine los mensajes 

  Swal.fire({
    position: "top-end",
    icon: tipo,
    title: mensaje,
    showConfirmButton: true,
    timer: 10000
  });

}

var peticionPost = function (url, body, callback) {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.open("POST", url);  //se debe colocar el http://
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(body); //el mismo data es el body

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var resultado = (JSON.parse(this.responseText));
      console.log(resultado)

      return callback(resultado)
    }
  });

}

var peticionGet = function (url, callback) { //el get trae toda la info en la url, no hay necesidad de body
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.open("GET", url);  //se debe colocar el http://
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(); //el mismo data es el body

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var resultado = (JSON.parse(this.responseText));
      console.log(resultado)

      return callback(resultado)
    }
  });

}

var login = function () {

  var email = document.getElementById("email").value
  var password = document.getElementById("password").value

  var post = {
    host: "http://localhost:3000",  //direacción del servidor o dominio
    path: "/usuarios/login", //lo que está después de la dirección del post ejemplo: /usuarios/save 
    payload: "email=" + email + "&password=" + password
  }

  peticionPost(post.host + post.path, post.payload, function (resultado) {
    if (resultado.state == true) {
      mensajeria("success", resultado.mensaje)
    } else {
      mensajeria("error", resultado.mensaje)
    }
  })

/*   var post = {
    host: "http://localhost:3000",  //direacción del servidor o dominio
    path: "/sumar/1/5", //lo que está después de la dirección del post ejemplo: /usuarios/save 
    
  }

  peticionGet(post.host + post.path, function (resultado) {
    if (resultado.state == true) {
      mensajeria("success", resultado.mensaje)
    } else {
      mensajeria("error", resultado.mensaje)
    }
  }) */

}