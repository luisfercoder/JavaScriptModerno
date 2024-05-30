let cliente = {
  table: '',
  hour:'',
  pedido :[]
};
const categorias = {
  1:'Comida',
  2:'Bebidas',
  3:'Postres'
}

const btnSaveClient = document.querySelector('#guardar-cliente');
btnSaveClient.addEventListener('click', saveClient);


function saveClient(){
  let table = document.querySelector('#mesa').value;
  let hour = document.querySelector('#hora').value;

  //Review if there have a empty field
  let emptyField = [table, hour].some(field => field ==='');

  if(emptyField){
    //Exist other alert
    let existAlert = document.querySelector('.invalid-feedback');
    if(!existAlert){
      let alert = document.createElement('DIV');
      alert.classList.add('invalid-feedback','d-block','text-center');
      alert.textContent ='Todos los campos son obligatorios';
      document.querySelector('.modal-body form').appendChild(alert);
      setTimeout (()=>{
        alert.remove();
      },2000);
    } return;
  }
  //Assign data of form of client
  cliente = {...cliente, table, hour}  
  //Hide Modal
  const modalForm = document.querySelector('#formulario');
  let modalBootstrap =bootstrap.Modal.getInstance(modalForm);
  modalBootstrap.hide()
 //Show the sections
 showSections();
 //Get dishes from API of JSON-server
 getDishes();
}

function showSections(){
  const hideSections = document.querySelectorAll('.d-none');
  hideSections.forEach(seccion => seccion.classList.remove('d-none'));
}
function getDishes(){
  const url = "http://localhost:4000/platillos";
  fetch(url)
  .then(respuesta => respuesta.json())
  .then(resultado => showDishes(resultado))
  .catch(error => console.log(error));
}
function showDishes(platillos){
  const contenido = document.querySelector('#platillos .contenido');
  platillos.forEach(platillo =>{
    const row = document.createElement('DIV');
    row.classList.add('row','py-3','border-top');

    const nombre= document.createElement('DIV');
    nombre.classList.add('col-md-4');
    nombre.textContent = platillo.nombre;

    const precio =document.createElement('DIV');
    precio.classList.add('col-md-3','fw-bold');
    precio.textContent = `$${platillo.precio}`;

    const categoria = document.createElement('DIV');
    categoria.classList.add('col-md-3');
    categoria.textContent = categorias[platillo.categoria];

    const inputCantidad = document.createElement('INPUT');
    inputCantidad.type ='number';
    inputCantidad.min = 0;
    inputCantidad.value=0;
    inputCantidad.id =`producto-${platillo.id}`;
    inputCantidad.classList.add('form-control');
    //Funtion that recibe the quantity and dish 
    inputCantidad.onchange = function(){
      const cantidad = parseInt(inputCantidad.value);
      agregarPlatillo({...platillo,cantidad});
    }
   

    const agregar = document.createElement('DIV');
    agregar.classList.add('col-md-2');
    agregar.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregar);

    contenido.appendChild(row);

  })
}

function agregarPlatillo(producto){
let {pedido}= cliente;
//review that quantiy be  more than 0
if(producto.cantidad > 0){
//check if already exist the element

   if(pedido.some(articulo => articulo.id===producto.id)){
   //actualize the quantity 
   const pedidoActualizado = pedido.map(articulo =>{
   if(articulo.id===producto.id){
   articulo.cantidad =producto.cantidad;
   }
   return articulo;
   });
  //Assign the new array to client
  cliente.pedido = [...pedidoActualizado]
   }else{
      cliente.pedido=[...pedido, producto];
   }
}else{
//Erase elements whean quantity is 0
const resultado = pedido.filter(articulo=> articulo.id !== producto.id);
cliente.pedido = [...resultado];
}
//clean code HTML
limpiarHTML();
//show the resume
actualizarResumen();
}

function actualizarResumen(){
  const contenido = document.querySelector('#resumen .contenido');

  const resume = document.createElement('DIV');
  resume.classList.add('col-md-6','card', 'py-5', 'px-3', 'shadow');
  //Info from table
  const mesa = document.createElement('P');
  mesa.textContent = 'Mesa: ';
  mesa.classList.add('fw-bold');

  const mesaSpan = document.createElement('SPAN');
  mesaSpan.textContent = cliente.table;
  mesaSpan.classList.add('fw-normal');
    //Info from hour
    const hora = document.createElement('P');
    hora.textContent = 'Hora: ';
    hora.classList.add('fw-bold');
  
    const horaSpan = document.createElement('SPAN');
    horaSpan.textContent = cliente.hour;
    horaSpan.classList.add('fw-normal');
  //Add to parents
  mesa.appendChild(mesaSpan);
  hora.appendChild(horaSpan);

  //Titulo de la seccion
  const heading = document.createElement('H3');
  heading.textContent = 'Platillos Consumidos';
  heading.classList.add('my-4','text-center');
  
  //Iterar above array of orders
  const grupo = document.createElement('UL');
  grupo.classList.add('list-group');

  const { pedido }=cliente;
  pedido.forEach(articulo =>{
    const {nombre, cantidad, precio,id}= articulo;
    const lista = document.createElement('LI');
    lista.classList.add('list-group-item');

    const nombreEl = document.createElement('H4');
    nombreEl.classList.add('my-4');
    nombreEl.textContent = nombre;

    //quantity of article
    const cantidadEl = document.createElement('P');
    cantidadEl.classList.add('fw-bold');
    cantidadEl.textContent = 'Cantidad: ';

    const cantidadValor = document.createElement('SPAN');
    cantidadValor.classList.add('fw-normal');
    cantidadValor.textContent = cantidad;

        //price of article
        const priceEl = document.createElement('P');
        priceEl.classList.add('fw-bold');
        priceEl.textContent = 'Precio: ';
    
        const priceValor = document.createElement('SPAN');
        priceValor.classList.add('fw-normal');
        priceValor.textContent = `$${precio}`;

    //Add values at containers
    cantidadEl.appendChild(cantidadValor);
    priceEl.appendChild(priceValor);


    //Add elements to list
    lista.appendChild(nombreEl);
    lista.appendChild(cantidadEl);
    lista.appendChild(priceEl);




    //Add list a group 
    grupo.appendChild(lista);

  });
  //Add to content
  resume.appendChild(mesa);
  resume.appendChild(hora);
  resume.appendChild(heading);
  resume.appendChild(grupo);



  contenido.appendChild(resume);

};

function limpiarHTML(){
  const contenido = document.querySelector('#resumen .contenido');

  while(contenido.firstChild){
    contenido.removeChild(contenido.firstChild);
  }
}