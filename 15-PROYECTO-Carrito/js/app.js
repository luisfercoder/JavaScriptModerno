//VAriables
const carrito =document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const limpiarCarritoBtn= document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articlesCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
  //Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener('click',agregarCurso);
}
//Funciones
function agregarCurso(e){
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado=e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado)
  }
 }
//Lee el contenido del HTML al que le dimos click  y extrae la infromacion del curso
function leerDatosCurso(curso){
  //  console.log(curso)
  //crear un objeto con el cotenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id:curso.querySelector('a').getAttribute('data-id'),
    cantidad:1

  }
  //Agregar elementos al arreglo de carrito
  articlesCarrito =[...articlesCarrito, infoCurso];
  console.log(articlesCarrito) ;
  

  carritoHTMl();
}

function carritoHTMl () {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  articlesCarrito.forEach(curso =>{
  const row = document.createElement('tr');
  row.innerHTML =`
  <td>
     ${curso.titulo}
  </td>
  `;
  //Agregar el HTML del carrito en el tbody
  contenedorCarrito.appendChild(row);
  });
}

//Eliminar los cursos del tbody
function limpiarHTML() {
  contenedorCarrito.innerHTML = '';
}
