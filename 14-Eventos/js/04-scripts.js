//evento en el formulario
const formulario =document.querySelector('#formulario');

formulario.addEventListener('submit', (e)=>{
 e.preventDefault();//usado para prevenir la accion 

 console.log(e);
});