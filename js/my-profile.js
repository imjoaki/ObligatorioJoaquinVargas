//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  if (localStorage.getItem("userInfo")) {
    mostrarInfoUsuario(JSON.parse(localStorage.getItem("userInfo")));
    infoU = JSON.parse(localStorage.getItem("userInfo"));
  }
});

function editarUsuario() {
  let nombreIn = document.getElementById("nombreIn").value;
  let apellidoIn = document.getElementById("apellidoIn").value;
  let edadIn = document.getElementById("edadIn").value;
  let emailIn = document.getElementById("emailIn").value;
  let celularIn = document.getElementById("celularIn").value;
  if (nombreIn != "") {
    infoU.nombre = nombreIn;
  }
  if (apellidoIn != "") {
    infoU.apellido = apellidoIn;
  }
  if (emailIn != "") {
    infoU.email = emailIn;
  }
  if (celularIn != "") {
    console.log(celularIn);
    infoU.celular = celularIn;
  }
  if (edadIn != "") {
    infoU.edad = edadIn;
  }
  localStorage.setItem("userInfo", JSON.stringify(infoU));
  mostrarInfoUsuario(infoU);
}

function mostrarInfoUsuario(objeto) {
  let nombreU = document.getElementById("nombreU");
  let edadU = document.getElementById("edadU");
  let correoU = document.getElementById("correoU");
  let celularU = document.getElementById("celularU");
  if (
    (objeto.nombre != "" && objeto.apellido != "") ||
    objeto.nombre != "" ||
    objeto.apellido != ""
  ) {
    nombreU.innerHTML = objeto.nombre + " " + objeto.apellido;
  }
  if (objeto.email != "") {
    correoU.innerHTML = objeto.email;
  }
  if (objeto.celular != "") {
    celularU.innerHTML = objeto.celular;
  }
  if (objeto.edad != "") {
    edadU.innerHTML = objeto.edad;
  }
}
