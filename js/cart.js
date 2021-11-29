//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_DESAFIO_URL =
  "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let carritoArray = [];
let subtotalesPorNombre = new Map();
let totalesPorNombre = new Map();
let subtotalesUyu = [];
let nombresParaIds = [];
let totalUyu = 0;
let subtotalItem = 0;
let costosDeEnvio = 0;
let nombreArticulos = [];
let mensajeMetodoPago = document.getElementById("tipoPagoMensaje");
let metodoPagoIn = "";

document.addEventListener("DOMContentLoaded", function (e) {
  cargarCarrito(CART_DESAFIO_URL);
});

function cargarCarrito(url) {
  fetch(url)
    .then((respuesta) => respuesta.json())

    .then((carritoFetch) => {
      carritoFetch.articles.forEach((item) => {
        carritoArray.push(item);
      });
      mostrarCarrito(carritoArray);
    })
    .catch((error) => alert("Hubo un error: " + error));
}

function mostrarCarrito(array) {
  let item = "";
  let lugarItems = document.getElementById("lugarItems");
  let costEnUyu;
  lugarItems.innerHTML = "";
  subtotalesPorNombre.clear();
  array.forEach((elemento) => {
    // -------------------------------------- //
    if (elemento.currency == "USD") {
      costEnUyu = 40 * elemento.unitCost;
    } else if (elemento.currency == "UYU") {
      costEnUyu = elemento.unitCost;
    }
    subtotalesPorNombre.set(elemento.name.replace(/\s/g, ""), costEnUyu);
    let idElemento = elemento.name.replace(/\s/g, "");
    // -------------------------------------- //
    item = `
    <div class="list-group-item" id="${idElemento}">
      <div class="row align-items-center">
        <div class="col-12 mb-1 bg-primary py-1 rounded text-light text-center">  
          <h4 class="d-inline">${elemento.name}</h4>
          <button class="d-inline btn float-right py-2" onclick="borrarItem(this)" id="boton${idElemento}"> <i class="fa fa-trash" style="font-size: large;"></i></button>
        </div>
        <div class="col-md-12 col-xl-4 text-center">
          <img
            src="${elemento.src}"
            alt="${elemento.name}"
            class="img-thumbnail"
          />
        </div>
        <div class="col-md-12 col-xl-8 mt-1">
          <div class="row">
          <div class="col-sm-12 col-md-8 col-lg-6 text-center p-0">
            <h3 class="mb-1 float-left w-100 border-bottom">Precio Unidad</h3>
            <h5 class="float-left w-100">$ ${costEnUyu.toLocaleString()} ~ U$S  ${(
      costEnUyu / 40
    ).toLocaleString()}</h5>
  
          </div>
          <div class="col-sm-12 col-md-4 col-lg-6 text-center float-left">
            <label class="mt-1" for="cantidad${elemento.name}">Cantidad</label>
              <input
                type="number"
                class="form-control align-items-center border-dark"
                id="cantidad${idElemento}"
                value="${elemento.count}"
                style="text-align: center"
                min="0"
                onchange="calcularSubtotales(subtotalesPorNombre)"
              />
          </div>
            </div>
            <div class="col-sm-12 pl-1 pr-0 mt-2 text-center">
                <h3 class="h3 mb-2 border-bottom">Precio total</h3>
                <h5 class="d-inline" id="totalUy${idElemento}">$ ${(
      elemento.count * costEnUyu
    ).toLocaleString()}</h5>
                <h5 class="mb-1 d-inline"">~</h5>
                <h5 class="mb-1 d-inline" id="totalUsd${idElemento}"> ${(
      (costEnUyu * elemento.count) /
      40
    ).toLocaleString()}</h5>
          </div>
        </div>
      </div>`;
    lugarItems.innerHTML += item;
  });
  calcularSubtotales(subtotalesPorNombre);
}

function borrarItem(botonItem) {
  console.log(botonItem.id.replace("boton", ""));
  document.getElementById(botonItem.id.replace("boton", "")).remove();
  let indexItem;

  carritoArray.forEach((item) => {
    if (item.name.replace(/\s/g, "") == botonItem.id.replace("boton", "")) {
      indexItem = carritoArray.indexOf(item);
      console.log("entre al if");
      console.log(indexItem);
      carritoArray.splice(indexItem, 1);
    } else {
      console.log("NO entre al if");
    }
  });
  mostrarCarrito(carritoArray);
}

function calcularSubtotales(mapaSubtotales) {
  totalUyu = 0;
  subtotalItem = 0;
  totalesPorNombre.clear();
  for (const [nombre, subtotal] of mapaSubtotales) {
    totalesPorNombre.set(
      nombre,
      subtotal * document.getElementById("cantidad" + nombre).value
    );
    totalUyu =
      totalUyu + document.getElementById("cantidad" + nombre).value * subtotal;
  }
  let tipoEnvio = document.getElementById("shippingOption").innerHTML;
  calculoEnvio(tipoEnvio);
  chequearCampos();
}

function mostrarResumenDeCompra(mapaTotales, totalEnUyu) {
  let subtotalUYU = document.getElementById("subtotalUyu");
  let subtotalUSD = document.getElementById("subtotalUsd");
  let totalUYU = document.getElementById("totalUyu");
  let totalUSD = document.getElementById("totalUsd");

  for (const [nombre, totalUy] of mapaTotales) {
    document.getElementById("totalUy" + nombre).innerHTML =
      "$ " + totalUy.toLocaleString();
    document.getElementById("totalUsd" + nombre).innerHTML =
      "U$S " + (totalUy / 40).toLocaleString();
  }

  subtotalUYU.innerHTML = "$ " + totalEnUyu.toLocaleString();
  subtotalUSD.innerHTML = "U$S " + (totalEnUyu / 40).toLocaleString();
  totalUYU.innerHTML = "$ " + (totalEnUyu + costosDeEnvio).toLocaleString();
  totalUSD.innerHTML =
    "U$S " +
    parseFloat(((totalEnUyu + costosDeEnvio) / 40).toFixed(1)).toLocaleString();
}

function calculoEnvio(tipoDeEnvio) {
  switch (tipoDeEnvio) {
    case "S":
      document.getElementById("shippingOption").classList =
        "float-right badge badge-secondary";
      document.getElementById("shippingOption").innerHTML = "S";
      document.getElementById("shippingCost").innerHTML =
        "$" + (totalUyu * 0.05).toLocaleString();
      costosDeEnvio = totalUyu * 0.05;
      break;
    case "E":
      document.getElementById("shippingOption").classList =
        "float-right badge badge-warning";
      document.getElementById("shippingOption").innerHTML = "E";
      document.getElementById("shippingCost").innerHTML =
        "$" + (totalUyu * 0.07).toLocaleString();
      costosDeEnvio = totalUyu * 0.07;
      break;
    case "P":
      document.getElementById("shippingOption").classList =
        "float-right badge badge-danger";
      document.getElementById("shippingOption").innerHTML = "P";
      document.getElementById("shippingCost").innerHTML =
        "$" + (totalUyu * 0.15).toLocaleString();
      costosDeEnvio = totalUyu * 0.15;
      break;
    default:
      break;
  }
  mostrarResumenDeCompra(totalesPorNombre, totalUyu);
}

function chequearCampos() {
  let boton = document.getElementById("btnMetodoPago");
  nombreArticulos = Array.from(subtotalesPorNombre.keys());
  let contadorVacios = 0;
  nombreArticulos.forEach((nombreArticulo) => {
    var inputCantidad = document.getElementById(
      "cantidad" + nombreArticulo
    ).value;
    if (
      (inputCantidad != "") &
      (inputCantidad != undefined) &
      (inputCantidad != 0)
    ) {
    } else {
      contadorVacios++;
    }
  });

  if (contadorVacios == 0) {
    boton.disabled = false;
  } else {
    boton.disabled = true;
  }
  habilitarCompra();
}

function mostrarCamposDePago(metodoDePago) {
  let camposCredito = document.getElementById("camposCredito");
  let camposTransferencia = document.getElementById("camposTransferencia");
  mensajeMetodoPago.style.display = "none";
  switch (metodoDePago) {
    case "credito":
      metodoPagoIn = metodoDePago;
      camposCredito.style.display = "block";
      camposTransferencia.style.display = "none";
      break;
    case "transferencia":
      metodoPagoIn = metodoDePago;
      camposCredito.style.display = "none";
      document.getElementById("nombreApellidoLocal").innerHTML =
        JSON.parse(localStorage.getItem("userInfo")).nombre +
        " " +
        JSON.parse(localStorage.getItem("userInfo")).apellido;
      camposTransferencia.style.display = "block";
      break;
    default:
      break;
  }
}

function chequearDireccionEnvio() {
  let dirMap = new Map();
  let dirNombre = document.getElementById("dirNombre");
  let dirCedula = document.getElementById("dirCedula");
  let dirDireccion = document.getElementById("dirDireccion");
  let dirCelular = document.getElementById("dirCelular");
  let dirDepartamento = document.getElementById("dirDepartamento");
  let dirPais = document.getElementById("dirPais");
  let contadorVacios = 0;
  let mensajeFail = document.getElementById("dirVacios");
  let mensajeOk = document.getElementById("dirGuardada");
  dirMap.set(dirNombre.name, dirNombre);
  dirMap.set(dirCedula.name, dirCedula);
  dirMap.set(dirDireccion.name, dirDireccion);
  dirMap.set(dirCelular.name, dirCelular);
  dirMap.set(dirDepartamento.name, dirDepartamento);
  dirMap.set(dirPais.name, dirPais);

  for (const [nombre, input] of dirMap) {
    if (input.value == "" || input.value == undefined) {
      input.classList.add("alert-danger");
      input.classList.remove("alert-success");
      contadorVacios++;
    } else {
      input.classList.add("alert-success");
      input.classList.remove("alert-danger");
    }
  }

  if (contadorVacios == 0) {
    guardarDireccionEnvio();
    mensajeFail.style.display = "none";
    mensajeOk.style.display = "block";
    setTimeout(() => {
      mensajeOk.style.display = "none";
    }, 3000);
  } else {
    mensajeFail.style.display = "block";
    mensajeOk.style.display = "none";
  }
}

function guardarDireccionEnvio() {
  let dirNombre = document.getElementById("dirNombre").value;
  let dirCedula = document.getElementById("dirCedula").value;
  let dirDireccion = document.getElementById("dirDireccion").value;
  let dirCelular = document.getElementById("dirCelular").value;
  let dirDepartamento = document.getElementById("dirDepartamento").value;
  let dirPais = document.getElementById("dirPais").value;
  let usuario = JSON.parse(localStorage.getItem("userInfo"));
  let direccionEnvioNuevo = {
    nombreDir: "",
    cedulaDir: "",
    direccionDir: "",
    celularDir: "",
    departamentoDir: "",
    paisDir: "",
  };

  direccionEnvioNuevo.nombreDir = dirNombre;
  direccionEnvioNuevo.cedulaDir = dirCedula;
  direccionEnvioNuevo.direccionDir = dirDireccion;
  direccionEnvioNuevo.celularDir = dirCelular;
  direccionEnvioNuevo.departamentoDir = dirDepartamento;
  direccionEnvioNuevo.paisDir = dirPais;

  usuario.direccionEnvio = direccionEnvioNuevo;
  localStorage.setItem("userInfo", JSON.stringify(usuario));
  habilitarCompra();
}

function guardarMetodoPago() {
  let tipoDePago = document.querySelector('input[name="tipoPago"]:checked');
  let numeroDeTarjeta = document.getElementById("numeroTarjeta");
  let nombreApellido = document.getElementById("nombreApellido");
  let fechaDeExpiracion = document.getElementById("fechaE");
  let codigoDeSeguridad = document.getElementById("codigo");
  let ci = document.getElementById("ci");
  let usuario = JSON.parse(localStorage.getItem("userInfo"));
  let metodoDePagoNuevo = {
    numeroTarjeta: "",
    nombreApellido: "",
    fechaDeExpiracion: "",
    codigoDeSeguridad: "",
    ci: "",
  };

  if (tipoDePago) {
    if (metodoPagoIn == "transferencia") {
      mensajeMetodoPago.innerHTML = `
      <p class="lead my-auto" style="font-size: larger; font-weight: bold">
      Metodo de pago de transferencia seleccionado!
      </p>
      <small>Ya puede cerrar esta ventana, darle a comprar,
        informarnos cuando realice la transferencia y asi
        obtener sus articulos!
        </small>
        `;
      mensajeMetodoPago.classList.replace("alert-danger", "alert-success");
      mensajeMetodoPago.style.display = "block";
      habilitarCompra(true);
    } else if (metodoPagoIn == "credito") {
      if (
        numeroDeTarjeta.value == "" ||
        nombreApellido.value == "" ||
        fechaDeExpiracion.value == "" ||
        codigoDeSeguridad.value == "" ||
        ci.value == ""
      ) {
        document.getElementById("faltanDatosPago").style.display = "block";
      } else {
        document.getElementById("faltanDatosPago").style.display = "none";
        metodoDePagoNuevo.numeroTarjeta = numeroDeTarjeta.value;
        metodoDePagoNuevo.nombreApellido = nombreApellido.value;
        metodoDePagoNuevo.fechaDeExpiracion = fechaDeExpiracion.value;
        metodoDePagoNuevo.codigoDeSeguridad = codigoDeSeguridad.value;
        metodoDePagoNuevo.ci = ci.value;

        mensajeMetodoPago.classList.replace("alert-danger", "alert-success");
        mensajeMetodoPago.innerHTML = `
        <p class="lead my-auto" style="font-size: larger; font-weight: bold">
          Datos de tarjeta guardados exitosamente!
        </p>
        <small>Ya puede cerrar esta ventana y comprar sus
          articulos!
        </small>
        `;
        mensajeMetodoPago.style.display = "block";
        usuario.metodoDePago = metodoDePagoNuevo;
        localStorage.setItem("userInfo", JSON.stringify(usuario));
        habilitarCompra();
      }
    }
  } else {
    mensajeMetodoPago.classList.replace("alert-success", "alert-danger");
    mensajeMetodoPago.innerHTML = `
    <p class="lead my-auto" style="font-size: larger; font-weight: bold">
      Por favor seleccione un metodo de pago antes de
      guardar!
    </p>
    <small>Una vez seleccionado el metodo de pago cierre esta
      ventana y podra realizar su compra.</small>
    `;
    mensajeMetodoPago.style.display = "block";
  }
}

function habilitarCompra(valor) {
  let usuario = JSON.parse(localStorage.getItem("userInfo"));
  let botonCompra = document.getElementById("btnComprar");
  let transferencia = valor;
  if (
    Object.values(usuario.direccionEnvio).length > 0 &&
    (Object.values(usuario.metodoDePago).length > 0 || transferencia == true)
  ) {
    if (
      Object.values(usuario.direccionEnvio).every(
        (element) => element !== ""
      ) &&
      (Object.values(usuario.metodoDePago).every((element) => element !== "") ||
        transferencia == true)
    ) {
      botonCompra.disabled = false;
    } else {
      botonCompra.disabled = true;
    }
  } else {
    botonCompra.disabled = true;
  }
}

function realizarCompra() {
  let mensajeDeCompra = document.getElementById("comprado");
  mensajeDeCompra.style.display = "block";

  setTimeout(() => {
    mensajeDeCompra.style.display = "none";
  }, 3000);
}
