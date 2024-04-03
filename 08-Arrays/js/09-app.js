const carrito = [
  {nombre:'Monitor 26 pulgadas', precio: 100},
  {nombre:'Television', precio: 200},
  {nombre:'Tablet', precio: 300},
  {nombre:'Audifonos', precio: 400},
  {nombre:'Teclado', precio: 500},
  {nombre:'Celular', precio: 600},

]

// for(let i=0;i < carrito.length; i++){
//   console.log(`${carrito[i].nombre}-Precio: ${producto.precio}`);

// }
//array method
carrito.forEach(function(producto)
{
  console.log(`${producto.nombre}-Precio: ${producto.precio}`);
})