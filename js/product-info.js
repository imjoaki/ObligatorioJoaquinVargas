//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const PRODUCT_INFO_URL =
  "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
let auto = localStorage.getItem("auto");

document.addEventListener("DOMContentLoaded", function (e) {
  cargarProducto(PRODUCT_INFO_URL);
  cargarComentarios(PRODUCT_INFO_COMMENTS_URL);
});

function cargarProducto(url) {
  fetch(url)
    .then((respuesta) => respuesta.json())

    .then((producto) => {
      if (producto.name == localStorage.getItem("auto")) {
        mostrarDetalle(producto);
      } else {
        mostrarMensaje(
          "No hay detalles para el auto seleccionado!",
          "detalles"
        );
      }
    })
    .catch((error) => alert("Hubo un error: " + error));
}

function mostrarDetalle(producto) {
  let dProduct = "";
  let lugarDetalles = document.getElementById("lugarDetalles");
  // console.log(producto.soldCount);

  dProduct = `<div class="card border-dark text-center my-2">
  <div class="card-body">
  <h2 class="card-title">${producto.name}</h2>
  <img src="${producto.images[0]}" alt="" class="card-img w-75" />
  <br />
  <br />
  <p class="card-text h4">
  ${producto.description}
  </p>
  <hr />
  <h5>
  Vendidos hasta al momento:
  <span class="badge badge-secondary">${producto.soldCount}</span>
  </h5>
  <hr />
  <br />
  <div
  id="sliderImagenes"
  class="carousel slide"
  data-ride="carousel"
  >
  <ol class="carousel-indicators">
  <li
  data-target="#sliderImagenes"
  data-slide-to="0"
  class="active"
  ></li>
  <li data-target="#sliderImagenes" data-slide-to="1"></li>
  <li data-target="#sliderImagenes" data-slide-to="2"></li>
  <li data-target="#sliderImagenes" data-slide-to="3"></li>
  </ol>
  <div class="carousel-inner">
  <div class="carousel-item active">
  <img
  class="d-block w-100"
  src="${producto.images[1]}"
  alt="First slide"
  />
  </div>
  <div class="carousel-item">
  <img
  class="d-block w-100"
  src="${producto.images[2]}"
  alt="Second slide"
  />
  </div>
  <div class="carousel-item">
  <img
  class="d-block w-100"
  src="${producto.images[3]}"
  alt="Third slide"
  />
  </div>
  <div class="carousel-item">
  <img
  class="d-block w-100"
  src="${producto.images[4]}"
  alt="Third slide"
  />
  </div>
  <a
  class="carousel-control-prev"
  href="#sliderImagenes"
  role="button"
  data-slide="prev"
  >
  <span
  class="carousel-control-prev-icon"
  aria-hidden="true"
  ></span>
  <span class="sr-only">Previous</span>
  </a>
  <a
  class="carousel-control-next"
  href="#sliderImagenes"
  role="button"
  data-slide="next"
  >
  <span
  class="carousel-control-next-icon"
  aria-hidden="true"
  ></span>
  <span class="sr-only">Next</span>
  </a>
  </div>
  </div>
  </div>
  <div class="card-footer">
  <h3>
  Precio:
  <span class="badge badge-secondary">${producto.currency} ${producto.cost}</span>
    </h3>
    <a href="#" class="btn btn-primary">Comprar</a>
    </div>
    </div>`;
  lugarDetalles.innerHTML += dProduct;
}

function cargarComentarios(url) {
  console.log(localStorage.getItem("auto"));
  fetch(url)
    .then((respuesta) => respuesta.json())

    .then((comentarios) => {
      if (!(comentarios.length <= 0)) {
        mostrarComentarios(comentarios);
      } else {
        mostrarMensaje(
          "No hay comentarios para el auto seleccionado!",
          "comentarios"
        );
      }
    })
    .catch((error) => alert("Hubo un error: " + error));
}

function mostrarComentarios(comentarios) {
  let comment = "";
  let lugarComentarios = document.getElementById("lugarComentarios");
  // Switch para mostrar puntaje
  comentarios.forEach((coment) => {
    comment =
      `<div class="card text-white bg-secondary mb-3" style="max-width: 18rem">
      <div class="card-header">
      <h4>${coment.user}</h4>
      ` +
      mostrarEstrellas(coment.score) +
      `
      </div>
      <div class="card-body">
      <p class="card-text">
      ${coment.description}
      </p>
      </div>
      </div>`;
    lugarComentarios.innerHTML += comment;
  });
}
// funcion para mostrar estrellas segun puntaje del 1-5 con default de 0 estrellas
function mostrarEstrellas(puntaje) {
  // console.log(puntaje);
  let cantEstrellas = "";
  switch (puntaje.toString()) {
    case "1":
      cantEstrellas = `<div class="text-center">
        <span id="1" class="fa fa-star checked"></span>
        <span id="2" class="fa fa-star"></span>
        <span id="3" class="fa fa-star"></span>
        <span id="4" class="fa fa-star"></span>
        <span id="5" class="fa fa-star"></span>
        </div>`;
      break;
    case "2":
      cantEstrellas = `<div class="text-center">
          <span id="1" class="fa fa-star checked"></span>
          <span id="2" class="fa fa-star checked"></span>
          <span id="3" class="fa fa-star"></span>
          <span id="4" class="fa fa-star"></span>
          <span id="5" class="fa fa-star"></span>
          </div>`;
      break;
    case "3":
      cantEstrellas = `<div class="text-center">
            <span id="1" class="fa fa-star checked"></span>
            <span id="2" class="fa fa-star checked"></span>
            <span id="3" class="fa fa-star checked"></span>
            <span id="4" class="fa fa-star"></span>
            <span id="5" class="fa fa-star"></span>
            </div>`;
      break;
    case "4":
      cantEstrellas = `<div class="text-center">
              <span id="1" class="fa fa-star checked"></span>
              <span id="2" class="fa fa-star checked"></span>
              <span id="3" class="fa fa-star checked"></span>
              <span id="4" class="fa fa-star checked"></span>
              <span id="5" class="fa fa-star"></span>
              </div>`;
      break;
    case "5":
      cantEstrellas = `<div class="text-center">
                <span id="1" class="fa fa-star checked"></span>
                <span id="2" class="fa fa-star checked"></span>
                <span id="3" class="fa fa-star checked"></span>
                <span id="4" class="fa fa-star checked"></span>
                <span id="5" class="fa fa-star checked"></span>
                </div>`;
      break;
    default:
      cantEstrellas = `<div class="text-center">
                  <span id="1" class="fa fa-star"></span>
                  <span id="2" class="fa fa-star"></span>
                  <span id="3" class="fa fa-star"></span>
                  <span id="4" class="fa fa-star"></span>
                  <span id="5" class="fa fa-star"></span>
                  </div>`;
      break;
  }
  return cantEstrellas;
}

function mostrarMensaje(mensaje, lugar) {
  let lugarMensaje;
  if (lugar == "detalles") {
    lugarMensaje = document.getElementById("lugarDetalles");
  } else if (lugar == "comentarios") {
    lugarMensaje = document.getElementById("lugarComentarios");
  }
  lugarMensaje.innerHTML = `
                  <h1 class="display-5 text-center my-5 p-5 border border-danger rounded">
                    ${mensaje}
                  </h1>`;
}

function enviarComent() {
  let arrayPuntajes = Array.from(
    document.getElementsByClassName("form-check-input")
  );
  let coment = document.getElementById("inputComentario");
  let usuario = document.getElementById("inputUsuario");

  arrayPuntajes.forEach((checkBox) => {
    if (checkBox.checked == true) {
      checkBox.checked = false;
    }
  });
  coment.value = "";
  usuario.value = "";
}
