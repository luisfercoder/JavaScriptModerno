//scroll
window.addEventListener('scroll',() => {
//   console.log('scrolling');
// //conocer cuentos px se mueve cuando se baja o sube
// const scrollPx=window.scrollY;
// console.log(scrollPx);
const premium = document.querySelector('.premium');
const ubicacion =premium.getBoundingClientRect();//en que posicion se encuentra
// console.log(ubicacion);
if(ubicacion.top < 784){
  console.log('El elemento es visible');
}else{
  console.log('Aun no es visible');
}
});
