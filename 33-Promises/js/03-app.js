const aplicarDescuento  = new Promise( (resolve, reject)=>{

  const descuento = true;
  if(descuento){
    resolve('Descuento Aplicado');
  }else{
    reject('No se pudo aplicar ')
  }
} )

aplicarDescuento
   .then( resultado => descuento(resultado))
   .catch(error => console.log(resultado))

function descuento(mensaje){
  console.log(mensaje);
}
//Hay 3 valores posibles
// fulfilled -El promise se cumplio 
// rejected - El promise no se cumplio
// pending - No se ha cumplido y tampoco fue rechazado 