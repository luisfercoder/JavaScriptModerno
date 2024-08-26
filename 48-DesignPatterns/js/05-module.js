//organizar codigo

 const mostrarCliente = nombre =>{
  console.log('hola')
};
export default mostrarCliente;


//como se realizaba antes de los modulos
const modulo1 = (function(){
  const nombre = 'Fernando';

  function hola(){
    console.log('hola');
  }
  return{
    nombre,
    hola
  }
})();
