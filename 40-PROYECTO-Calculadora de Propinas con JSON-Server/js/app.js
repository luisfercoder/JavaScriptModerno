let cliente = {
  table: '',
  hour:'',
  order :[]
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
  
  console.log(cliente)
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
  console.log(producto)

}