const busqueda = document.querySelector('.busqueda');

busqueda.addEventListener('keydown',() => {
  console.log('escribiendo...');
});
//keyout
//copy
//paste
//cut
//input
busqueda.addEventListener('keydown',(e) => {
  console.log(e);
});