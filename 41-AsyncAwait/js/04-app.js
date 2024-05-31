function descargarNuevosClientes(){
  return new Promise(resolve =>{
    console.log('Descargando clientes...');

    setTimeout(()=>{
      resolve('Los clientes fueron descargados');
    },5000);
  })
}
function descargarNuevasOrdenes(){
  return new Promise(resolve =>{
    console.log('Descargando pedidos...');

    setTimeout(()=>{
      resolve('Los pedidos fueron descargados');
    },3000);
  })
}
const app = async ()=>{
  try{ 
    //promise.all  se crea un arreglo y no dependen un promise de otro
   const respuestas = await Promise.all([descargarNuevosClientes(),descargarNuevasOrdenes()]);
   console.log(respuestas)
  }catch{

  }

}
app();