//funcion que regresa un iterador 

function *crearGenerador(){
  yield 1;
  yield'FER';
  yield 3+3;
  yield true;
}

// const iterador = crearGenerador();
// console.log(iterador);
// console.log(iterador.next().value);
// console.log(iterador.next());
// console.log(iterador.next().value);
// console.log(iterador.next());
// console.log(iterador.next());//Termino de iterar 

//Generador para carrito de compras

function *generadorCarrito(carrito){
  for(let i = 0;i < carrito.length; i++){
    yield carrito[i];
  }

}
const carrito = ['Producto 1','Producto 2','Producto 3'];

const iterador= generadorCarrito(carrito);

console.log(iterador.next());
console.log(iterador.next());
console.log(iterador.next());
console.log(iterador.next());

