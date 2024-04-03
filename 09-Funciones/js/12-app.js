const carrito = [
  {nombre:'Monitor 26 pulgadas', precio: 100},
  {nombre:'Television', precio: 200},
  {nombre:'Tablet', precio: 300},
  {nombre:'Audifonos', precio: 400},
  {nombre:'Teclado', precio: 500},
  {nombre:'Celular', precio: 600},

]

const nuevo_arreglo = carrito.map ( product => `${product.nombre}-Precio: ${product.precio}`);

console.log(nuevo_arreglo);
//map va a crear otro nuevo arreglo

// carrito.map(function(producto)
// {
//   console.log(`${producto.nombre}-Precio: ${producto.precio}`);
// })