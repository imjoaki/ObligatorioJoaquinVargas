//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let inputUsuario = document.getElementById("usuario");
let inputContra = document.getElementById("contra");
let botonLogin = document.getElementById("btn");
document.addEventListener("DOMContentLoaded", function (e) {});
inputUsuario.addEventListener("keyup", (tecla) => {
  if (tecla.keyCode === 13) {
    tecla.preventDefault();
    botonLogin.click();
  }
});
inputContra.addEventListener("keyup", (tecla) => {
  if (tecla.keyCode === 13) {
    tecla.preventDefault();
    botonLogin.click();
  }
});

function chequearLogin() {
  let loged = false;
  let usuario = "";
  if ((inputUsuario.value == "") & (inputContra.value == "")) {
    // Cambio la clase de los input para cambiar color a rojo
    // Cambio el placeholder para mostrar al usuario que tiene que hacer
    inputUsuario.classList.add("alert-danger");
    inputUsuario.placeholder =
      "Por favor ingrese su ususario para iniciar sesion";
    inputContra.classList.add("alert-danger");
    inputContra.placeholder =
      "Por favor ingrese su contraseña para iniciar sesion";
  } else if (inputUsuario.value == "") {
    inputUsuario.classList.add("alert-danger");
    inputUsuario.placeholder =
      "Por favor ingrese su ususario para iniciar sesion";
    inputContra.classList.remove("alert-danger");
  } else if (inputContra.value == "") {
    inputUsuario.classList.remove("alert-danger");
    inputContra.classList.add("alert-danger");
    inputContra.placeholder =
      "Por favor ingrese su contraseña para iniciar sesion";
  } else {
    usuario = inputUsuario.value;
    loged = true;
    window.location.assign("index.html");
  }
  localStorage.setItem("user", usuario);
  localStorage.setItem("loged", loged);
  console.log(localStorage.getItem("user"));
}
