let cliente = {
  table: "",
  hour: "",
  pedido: [],
};
const categorias = {
  1: "Comida",
  2: "Bebidas",
  3: "Postres",
};

const btnSaveClient = document.querySelector("#guardar-cliente");
btnSaveClient.addEventListener("click", saveClient);

function saveClient() {
  let table = document.querySelector("#mesa").value;
  let hour = document.querySelector("#hora").value;

  //Review if there have a empty field
  let emptyField = [table, hour].some((field) => field === "");

  if (emptyField) {
    //Exist other alert
    let existAlert = document.querySelector(".invalid-feedback");
    if (!existAlert) {
      let alert = document.createElement("DIV");
      alert.classList.add("invalid-feedback", "d-block", "text-center");
      alert.textContent = "Todos los campos son obligatorios";
      document.querySelector(".modal-body form").appendChild(alert);
      setTimeout(() => {
        alert.remove();
      }, 2000);
    }
    return;
  }
  //Assign data of form of client
  cliente = { ...cliente, table, hour };
  //Hide Modal
  const modalForm = document.querySelector("#formulario");
  let modalBootstrap = bootstrap.Modal.getInstance(modalForm);
  modalBootstrap.hide();
  //Show the sections
  showSections();
  //Get dishes from API of JSON-server
  getDishes();
}

function showSections() {
  const hideSections = document.querySelectorAll(".d-none");
  hideSections.forEach((seccion) => seccion.classList.remove("d-none"));
}
function getDishes() {
  const url = "http://localhost:4000/platillos";
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => showDishes(resultado))
    .catch((error) => console.log(error));
}
function showDishes(platillos) {
  const contenido = document.querySelector("#platillos .contenido");
  platillos.forEach((platillo) => {
    const row = document.createElement("DIV");
    row.classList.add("row", "py-3", "border-top");

    const nombre = document.createElement("DIV");
    nombre.classList.add("col-md-4");
    nombre.textContent = platillo.nombre;

    const precio = document.createElement("DIV");
    precio.classList.add("col-md-3", "fw-bold");
    precio.textContent = `$${platillo.precio}`;

    const categoria = document.createElement("DIV");
    categoria.classList.add("col-md-3");
    categoria.textContent = categorias[platillo.categoria];

    const inputCantidad = document.createElement("INPUT");
    inputCantidad.type = "number";
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    inputCantidad.id = `producto-${platillo.id}`;
    inputCantidad.classList.add("form-control");
    //Funtion that recibe the quantity and dish
    inputCantidad.onchange = function () {
      const cantidad = parseInt(inputCantidad.value);
      agregarPlatillo({ ...platillo, cantidad });
    };

    const agregar = document.createElement("DIV");
    agregar.classList.add("col-md-2");
    agregar.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregar);

    contenido.appendChild(row);
  });
}

function agregarPlatillo(producto) {
  let { pedido } = cliente;
  //review that quantiy be  more than 0
  if (producto.cantidad > 0) {
    //check if already exist the element

    if (pedido.some((articulo) => articulo.id === producto.id)) {
      //actualize the quantity
      const pedidoActualizado = pedido.map((articulo) => {
        if (articulo.id === producto.id) {
          articulo.cantidad = producto.cantidad;
        }
        return articulo;
      });
      //Assign the new array to client
      cliente.pedido = [...pedidoActualizado];
    } else {
      cliente.pedido = [...pedido, producto];
    }
  } else {
    //Erase elements whean quantity is 0
    const resultado = pedido.filter((articulo) => articulo.id !== producto.id);
    cliente.pedido = [...resultado];
  }
  //clean code HTML
  limpiarHTML();

  if (cliente.pedido.length) {
    //show the resume
    actualizarResumen();
  } else {
    mensagePedidoVacio();
  }
}

function actualizarResumen() {
  const contenido = document.querySelector("#resumen .contenido");

  const resume = document.createElement("DIV");
  resume.classList.add("col-md-6", "card", "py-2", "px-3", "shadow");
  //Info from table
  const mesa = document.createElement("P");
  mesa.textContent = "Mesa: ";
  mesa.classList.add("fw-bold");

  const mesaSpan = document.createElement("SPAN");
  mesaSpan.textContent = cliente.table;
  mesaSpan.classList.add("fw-normal");
  //Info from hour
  const hora = document.createElement("P");
  hora.textContent = "Hora: ";
  hora.classList.add("fw-bold");

  const horaSpan = document.createElement("SPAN");
  horaSpan.textContent = cliente.hour;
  horaSpan.classList.add("fw-normal");
  //Add to parents
  mesa.appendChild(mesaSpan);
  hora.appendChild(horaSpan);

  //Titulo de la seccion
  const heading = document.createElement("H3");
  heading.textContent = "Platillos Consumidos";
  heading.classList.add("my-4", "text-center");

  //Iterar above array of orders
  const grupo = document.createElement("UL");
  grupo.classList.add("list-group");

  const { pedido } = cliente;
  pedido.forEach((articulo) => {
    const { nombre, cantidad, precio, id } = articulo;
    const lista = document.createElement("LI");
    lista.classList.add("list-group-item");

    const nombreEl = document.createElement("H4");
    nombreEl.classList.add("my-4");
    nombreEl.textContent = nombre;

    //quantity of article
    const cantidadEl = document.createElement("P");
    cantidadEl.classList.add("fw-bold");
    cantidadEl.textContent = "Cantidad: ";

    const cantidadValor = document.createElement("SPAN");
    cantidadValor.classList.add("fw-normal");
    cantidadValor.textContent = cantidad;

    //price of article
    const priceEl = document.createElement("P");
    priceEl.classList.add("fw-bold");
    priceEl.textContent = "Precio: ";

    const priceValor = document.createElement("SPAN");
    priceValor.classList.add("fw-normal");
    priceValor.textContent = `$${precio}`;

    //subtotal of article
    const subTotalEl = document.createElement("P");
    subTotalEl.classList.add("fw-bold");
    subTotalEl.textContent = "Subtotal: ";

    const subTotalValor = document.createElement("SPAN");
    subTotalValor.classList.add("fw-normal");
    subTotalValor.textContent = calcularSubtotal(precio, cantidad);

    //button to erase
    const btnEliminar = document.createElement("BUTTON");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.textContent = "Eliminar el Pedido";

    btnEliminar.onclick = function () {
      eliminarProducto(id);
    };

    //Add values at containers
    cantidadEl.appendChild(cantidadValor);
    priceEl.appendChild(priceValor);
    subTotalEl.appendChild(subTotalValor);

    //Add elements to list
    lista.appendChild(nombreEl);
    lista.appendChild(cantidadEl);
    lista.appendChild(priceEl);
    lista.appendChild(subTotalEl);
    lista.appendChild(btnEliminar);

    //Add list a group
    grupo.appendChild(lista);
  });
  //Add to content
  resume.appendChild(heading);
  resume.appendChild(mesa);
  resume.appendChild(hora);

  resume.appendChild(grupo);

  contenido.appendChild(resume);

  //Show form of propinas
  formularioPropinas();
}

function limpiarHTML() {
  const contenido = document.querySelector("#resumen .contenido");

  while (contenido.firstChild) {
    contenido.removeChild(contenido.firstChild);
  }
}
function calcularSubtotal(precio, cantidad) {
  return `$${precio * cantidad}`;
}
function eliminarProducto(id) {
  const { pedido } = cliente;
  const resultado = pedido.filter((articulo) => articulo.id !== id);
  cliente.pedido = [...resultado];

  //clean code HTML
  limpiarHTML();
  if (cliente.pedido.length) {
    //show the resume
    actualizarResumen();
  } else {
    mensagePedidoVacio();
  }
  //  //Return quantity at 0 in the form
  const productoEliminado = `#producto-${id}`;
  console.log(productoEliminado);
  const inputEliminado = document.querySelector(productoEliminado);
  inputEliminado.value = 0;
}

function mensagePedidoVacio() {
  const contenido = document.querySelector("#resumen .contenido");

  const texto = document.createElement("P");
  texto.classList.add("text-center");
  texto.textContent = "Añade los elmentos del pedido";

  contenido.appendChild(texto);
}

function formularioPropinas() {
  const contenido = document.querySelector("#resumen .contenido");

  const formulario = document.createElement("DIV");
  formulario.classList.add("col-md-6", "formulario");

  const divFormulario = document.createElement("DIV");
  divFormulario.classList.add("card", "py-2", "px-3", "shadow");

  const heading = document.createElement("H3");
  heading.classList.add("my-4", "text-center");
  heading.textContent = "Propina";

  //Radio button 10%
  const radio10 = document.createElement("INPUT");
  radio10.type = "radio";
  radio10.name = "propina";
  radio10.value = "10";
  radio10.classList.add("form-check-input");
  radio10.onclick = calcularPropina;

  const radio10Label = document.createElement("LABEL");
  radio10Label.textContent = "10%";
  radio10Label.classList.add("form-check-label");

  const radio10Div = document.createElement("DIV");
  radio10Div.classList.add("form-check");

  radio10Div.appendChild(radio10);
  radio10Div.appendChild(radio10Label);

  //Radio button 15%
  const radio15 = document.createElement("INPUT");
  radio15.type = "radio";
  radio15.name = "propina";
  radio15.value = "15";
  radio15.classList.add("form-check-input");
  radio15.onclick = calcularPropina;

  const radio15Label = document.createElement("LABEL");
  radio15Label.textContent = "15%";
  radio15Label.classList.add("form-check-label");

  const radio15Div = document.createElement("DIV");
  radio15Div.classList.add("form-check");

  radio15Div.appendChild(radio15);
  radio15Div.appendChild(radio15Label);

  //Radio button 30%
  const radio30 = document.createElement("INPUT");
  radio30.type = "radio";
  radio30.name = "propina";
  radio30.value = "30";
  radio30.classList.add("form-check-input");
  radio30.onclick = calcularPropina;

  const radio30Label = document.createElement("LABEL");
  radio30Label.textContent = "30%";
  radio30Label.classList.add("form-check-label");

  const radio30Div = document.createElement("DIV");
  radio30Div.classList.add("form-check");

  radio30Div.appendChild(radio30);
  radio30Div.appendChild(radio30Label);

  //Add to principal Div
  divFormulario.appendChild(heading);
  divFormulario.appendChild(radio10Div);
  divFormulario.appendChild(radio15Div);
  divFormulario.appendChild(radio30Div);

  //Add to form
  formulario.appendChild(divFormulario);

  contenido.append(formulario);
}

function calcularPropina() {
  const { pedido } = cliente;
  let subtotal = 0;
  //Calculate subtotal
  pedido.forEach((articulo) => {
    subtotal += articulo.cantidad * articulo.precio;
  });

  //Select Radio button with client tip
  const propinaSeleccionada = document.querySelector(
    '[name="propina"]:checked'
  ).value;

  //Calculate tip
  const propina = (subtotal * parseInt(propinaSeleccionada)) / 100;
  console.log(propina);

  //Calculate total to pay
  const total = subtotal + propina;
  mostrarTotalHTML(subtotal, total, propina);
}
function mostrarTotalHTML(subtotal, total, propina) {
  const divTotales = document.createElement("DIV");
  divTotales.classList.add("total-pagar", "my-5");
  //subtotal
  const subtotalParrafo = document.createElement("P");
  subtotalParrafo.classList.add("fs-3", "fw-bold", "mt-2");
  subtotalParrafo.textContent = "Subtotal Consumo: ";

  const subtotalSpan = document.createElement("SPAN");
  subtotalSpan.classList.add("fw-normal");
  subtotalSpan.textContent = `$${subtotal}`;

  subtotalParrafo.appendChild(subtotalSpan);

  //tip
  const propinaParrafo = document.createElement("P");
  propinaParrafo.classList.add("fs-3", "fw-bold", "mt-2");
  propinaParrafo.textContent = "Propina: ";

  const propinaSpan = document.createElement("SPAN");
  propinaSpan.classList.add("fw-normal");
  propinaSpan.textContent = `$${propina}`;

  propinaParrafo.appendChild(propinaSpan);

  //tip
  const totalParrafo = document.createElement("P");
  totalParrafo.classList.add("fs-3", "fw-bold", "mt-2");
  totalParrafo.textContent = "Total: ";

  const totalSpan = document.createElement("SPAN");
  totalSpan.classList.add("fw-normal");
  totalSpan.textContent = `$${total}`;

  totalParrafo.appendChild(totalSpan);

  //Erase the last result
  const totalpagarDiv = document.querySelector(".total-pagar");
  if (totalpagarDiv) {
    totalpagarDiv.remove();
  }
  divTotales.appendChild(subtotalParrafo);
  divTotales.appendChild(propinaParrafo);
  divTotales.appendChild(totalParrafo);

  const formulario = document.querySelector(".formulario > div");
  formulario.appendChild(divTotales);
}
