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

  //ELiminar cursos del carrito 
  carrito.addEventListener('click', eliminarCurso);
  
  //Vaciar carrito 
  limpiarCarritoBtn.addEventListener('click',()=>{
    articlesCarrito =[];//reseteamos el arreglo
    
    limpiarHTML();//Eliminamos todo el HTMl

  })
}
//Funciones
function agregarCurso(e){
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado=e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado)
  }
 }
//Elimina un curso del carrito 
function eliminarCurso(e){
  if(e.target.classList.contains('borrar-curso')){
    const cursoId =e.target.getAttribute('data-id');
    //Eliminar del arreglo de articlesCarrito por el data-id
    articlesCarrito=articlesCarrito.filter( curso => curso.id !== cursoId);
    carritoHTMl();//iterar sobre el carrito y mostrar su HTMl
  }
}
//Lee el contenido del HTML al que le dimos click  y extrae la infromacion del curso
function leerDatosCurso(curso){
    console.log(curso)
  //crear un objeto con el cotenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id:curso.querySelector('a').getAttribute('data-id'),
    cantidad:1
  }
  //Revisa si un elemento ya existe en el carrito 
  const existe= articlesCarrito.some(curso => curso.id ===infoCurso.id);
  if(existe){
    //Actualizamos la cantidad
    const cursos =articlesCarrito.map( curso => {
      if(curso.id ===infoCurso.id){
        curso.cantidad++;
        return curso;
      }else{
        return curso;
      }
    });
    articlesCarrito = [...cursos];

  }else{
  //Agregar elementos al arreglo de carrito
  articlesCarrito =[...articlesCarrito, infoCurso];
  // console.log(articlesCarrito) ;
  }


  

  carritoHTMl();
}

function carritoHTMl () {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  articlesCarrito.forEach(curso =>{
    const {imagen,titulo,precio,cantidad,id} = curso;
  const row = document.createElement('tr');
  row.innerHTML =`
  <td>
     <img src="${imagen}" width="100">
  </td>
  <td>${titulo}</td>
  <td>${precio}</td>
  <td>${cantidad}</td>
  <td>
  <a href="#" class="borrar-curso" data-id="${id}">X</a>
  </td>

  `;
  //Agregar el HTML del carrito en el tbody
  contenedorCarrito.appendChild(row);
  });
}

//Eliminar los cursos del tbody
function limpiarHTML() {
  //forma lenta
  // contenedorCarrito.innerHTML = '';
  //forma rapida
   while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
   }
}
