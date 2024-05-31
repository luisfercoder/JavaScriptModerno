function descargarClientes(){
  
  return new Promise((resolve,reject)=>{
    const error = true;
    setTimeout(()=>{
       if(!error){
        resolve('El listado se descargo correctamente');
       }else{
        reject('Error en la conexion ')
       }
    },3000)
  })
}
//Async Await
async function ejecutar(){
 try{
  console.log(1+1)
  const respuesta = await descargarClientes();
  console.log(2+2);
  console.log(respuesta);
 }catch(error){
  console.log(error)
 }
}
ejecutar();