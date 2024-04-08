const nav = document.querySelector('.navegacion');

//registrar un evento 
// nav.addEventListener('click',() => {
// console.log('click en nav');
// });

// tambien se puede utilizar mouseenter --para que se ejecute cuando coloque el cursor 
nav.addEventListener('mouseenter',()=>{
  console.log('acercando en la navegacion');
  nav.style.background = 'red';

});
nav.addEventListener('mouseout',()=>{
  console.log('saliendo en la navegacion');
  nav.style.background = 'transparent';


});
//mousedown = 'click'
//dbclick es dobleclick