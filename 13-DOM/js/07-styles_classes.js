const encabezado = document.querySelector('h1');

encabezado.style.backgroundColor ='pink';
encabezado.style.fontFamily ='Arial';
encabezado.style.textTransform ='uppercase';

//agregar una nueva clase
const card = document.querySelector('.card');
card.classList.add('nueva-clase','segunda-clase');
//eliminar una clase
card.classList.remove('card');
console.log(card.classList);