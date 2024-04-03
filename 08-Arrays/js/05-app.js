// const meses =['Enero','Febrero','Marzo'];
// //agregar al final del arreglo
// meses.push('Abril');
// meses.push('Mayo');
// console.table(meses);

const carrito =[];

const product={
  nombre: "Monitor 32 pulgadas",
  precio: 400
}
const product2={
  nombre: "Celular",
  precio: 800
}
const product3={
  nombre: "Teclado",
  precio: 50
}
//agregar producto a carrito al final
carrito.push(product);
carrito.push(product2);
//agregar un elemento al inicio
carrito.unshift(product3)
console.table(carrito);