const PRODUCTS_URL =
  "https://japdevdep.github.io/ecommerce-api/product/all.json";

//Entregable 2
//filtrar productos deacuerdo al rango selecionado
//Creo un array de objetos con los productos para poder manipular mas facilmente el orden
let prodArray = [];
let currentArray = [];
let inputMin = document.getElementById("inputMin");
let inputMax = document.getElementById("inputMax");

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  cargarProductos(PRODUCTS_URL);
});

function filtrarPorPrecio() {
  let filtradosPorPrecio = [];
  if (
    (inputMax.value != undefined &&
      inputMax.value != null &&
      inputMax.value != "") ||
    (inputMin.value != undefined &&
      inputMin.value != null &&
      inputMin.value != "")
  ) {
    prodArray.forEach((pro) => {
      if (
        (inputMin.value == "" ||
          (inputMin.value != "" && parseInt(pro.cost) >= inputMin.value)) &&
        (inputMax.value == "" ||
          (inputMax.value != "" && parseInt(pro.cost) <= inputMax.value))
      ) {
        filtradosPorPrecio.push(pro);
      }
    });
    mostrarNuevo(filtradosPorPrecio);
  } else {
    mostrarNuevo(prodArray);
  }
}

function vaciarRango() {
  inputMin.value = null;
  inputMax.value = null;
}

function resetearFiltros() {
  vaciarRango();
  mostrarNuevo(prodArray);
}

function filtrarPorMayor() {
  currentArray.sort((a, b) => b.cost - a.cost);
  // console.log(currentArray);
  // console.log("Fin mayor");
  mostrarNuevo(currentArray);
}

function filtrarPorMenor() {
  currentArray.sort((a, b) => a.cost - b.cost);
  // console.log(currentArray);
  // console.log("Fin menor");
  borrar();
  mostrarNuevo(currentArray);
}

function filtrarPorRelevancia() {
  currentArray.sort((a, b) => b.soldCount - a.soldCount);
  // console.log("Fin Relevancia");
  borrar();
  mostrarNuevo(currentArray);
}

function borrar() {
  let lugarProductos = document.getElementById("lugarProductos");
  lugarProductos.innerHTML = "";
}

function mostrarNuevo(array) {
  borrar();
  let producto = "";
  array.forEach((prod) => {
    producto = `<div class="card m-1">
    <img src="${prod.imgSrc}" class="card-img-top" alt="${prod.name}" />
    <div class="card-body">
      <h5 class="card-title">${prod.name}</h5>
      <p class="card-text">
        ${prod.description}
      </p>
      <p class="text-center h5">
        <small class="text-muted">Vendidos hasta el momento: <span class="badge badge-secondary"> ${
          prod.soldCount
        }</span></small>
      </p>
      </div>
      <div class="card-footer text-center">
      <h3>Precio: <span class="badge badge-secondary">${prod.cost.toLocaleString()} ${
      prod.currency
    }</span></h3>
      </div>
      <a href="#" class="btn btn-secondary m-1" onclick="guardarAuto('${
        prod.name
      }')">
            Detalles
            </a>
      <a href="#" class="btn btn-primary m-1">Comprar</a>
  </div>`;
    lugarProductos.innerHTML += producto;
  });
}

function guardarAuto(auto) {
  localStorage.setItem("auto", auto);
  window.location.assign("product-info.html");
}

function cargarProductos(url) {
  fetch(url)
    .then((respuesta) => respuesta.json())

    .then((productos) => {
      productos.forEach((prod) => {
        prodArray.push(prod);
        currentArray.push(prod);
      });
      mostrarNuevo(prodArray);
    })
    .catch((error) => alert("Hubo un error: " + error));
}
