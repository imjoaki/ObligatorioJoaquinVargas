const PRODUCTS_URL =
  "https://japdevdep.github.io/ecommerce-api/product/all.json";
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  cargarProductos(PRODUCTS_URL);
});

function cargarProductos(url) {
  let lugarProductos = document.getElementById("lugarProductos");
  let producto = "";
  fetch(url)
    .then((respuesta) => respuesta.json())

    .then((productos) => {
      console.log(productos);
      productos.forEach((prod) => {
        producto = `<div class="card">
        <img src="${prod.imgSrc}" class="card-img-top" alt="${prod.name}" />
        <div class="card-body">
          <h5 class="card-title">${prod.name}</h5>
          <p class="card-text">
            ${prod.description}
          </p>
          <p>
            <small class="text-muted">Vendidos hasta el momento: ${prod.soldCount}</small>
          </p>
          </div>
          <div class="card-footer text-center">
          <h3>Precio: <span class="badge badge-secondary">${prod.cost} ${prod.currency}</span></h3>
          </div>
          <a href="#" class="btn btn-primary m-1">Go somewhere</a>
      </div>`;
        lugarProductos.innerHTML += producto;
      });
    })
    .catch((error) => alert("Hubo un error: " + error));
}
