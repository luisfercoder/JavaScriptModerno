const encabezado =document.querySelector('.contenido-hero h1')
console.log(encabezado);

// console.log(encabezado.innerText);//si el CSS-visibility :hidden ; no lo va a encontrar
// console.log(encabezado.textContent);// si lo v a a encontrar
// console.log(encabezado.innerHTML);//se trae el HTML

document.querySelector('.contenido-hero h1') .textContent ='nuevo heading';

const imagen =document.querySelector('.card img');
imagen.src = 'img/hacer1.jpg';