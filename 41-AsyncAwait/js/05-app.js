const url = 'http://picsum.photos/list';

document.addEventListener('DOMContentLoaded',obtenerDatos);

//Es con promises
// function obtenerDatos(){
//   fetch(url)
//    .then(respuesta => respuesta.json())
//    .then(resultado => console.log(resultado))
//    .catch(error => console.log(error))
// }


//Es con async await sin catch
// async function obtenerDatos(){
//   const respuesta = await fetch(url);
//   const resultado = await respuesta.json();
//   console.log(resultado);
// }

async function obtenerDatos(){
  try{
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    console.log(resultado);

  }catch(error){
    console.log(error)
  }
}