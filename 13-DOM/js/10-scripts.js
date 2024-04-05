// const enlace= document.createElement('A');

// //Agregar el texto 
// enlace.textContent ='Nuevo Enlace';
// //añadiendo href 
// enlace.href = '/nuevo-enlace';

// console.log(enlace);
// //Seleccionar la navegacion 
// const navegacion = document.querySelector('.navegacion');
// console.log(navegacion.children);
// //agregar con appendChild
// //navegacion.appendChild(enlace);
// //agregar en medio 
// navegacion.insertBefore(enlace,navegacion.children[1]);

//crear un CARD
const parrafo1 =document.createElement('P');
parrafo1.textContent ='Concierto';
parrafo1.classList.add('categoria','concierto');

const parrafo2 =document.createElement('P');
parrafo2.textContent='Concierto de Rock';
parrafo2.classList.add('titulo');

const parrafo3 =document.createElement('P');
parrafo3.textContent='$800 por persona';
parrafo3.classList.add('precio');
//crear div conla clase info
const info =document.createElement('div');
info.classList.add('info');
//agregando  a info con appendChild 
info.appendChild(parrafo1);
info.appendChild(parrafo2);
info.appendChild(parrafo3);
//crear imagen 
const imagen = document.createElement('img');
imagen.src ='img/hacer1.jpg';
// puedes agregar clases o alt 

//crear el CARD
const card =document.createElement('div');
card.classList.add('card');
// //Asignar la imagen 
card.appendChild(imagen);
// //Asignar la info
card.appendChild(info);
//insertar en el HTML
const contenedor = document.querySelector('.hacer .contenedor-cards');
//si lo quiero agregar al final 
// contenedor.appendChild(card);

//si lo quiero agregar al inicio 
contenedor.insertBefore(card, contenedor.children[2]);