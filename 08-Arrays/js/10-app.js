const carrito = [
  {nombre:'Monitor 26 pulgadas', precio: 100},
  {nombre:'Television', precio: 200},
  {nombre:'Tablet', precio: 300},
  {nombre:'Audifonos', precio: 400},
  {nombre:'Teclado', precio: 500},
  {nombre:'Celular', precio: 600},

]


carrito.forEach(function(producto)
{
  console.log(`${producto.nombre}-Precio: ${producto.precio}`);
})
//map va a crear otro nuevo arreglo
carrito.map(function(producto)
{
  console.log(`${producto.nombre}-Precio: ${producto.precio}`);
})