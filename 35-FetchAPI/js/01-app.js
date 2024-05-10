
const cargarTxBtn = document.querySelector('#cargarTxt');
cargarTxBtn.addEventListener('click',obtenerDatos);

function obtenerDatos(){
  const url = 'data/datos.txt';

  fetch(url) 
    .then(respuesta =>{
      console.log(respuesta);//trae todo el objeto 
      console.log(respuesta.status);
      console.log(respuesta.statusText); 
      console.log(respuesta.url);
      console.log(respuesta.type);

      return respuesta.text()
    } )
    .then(datos =>{
      console.log(datos);
    })
    .catch(error =>{
      console.log(error);
    })
}