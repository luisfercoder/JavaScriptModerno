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
//forma declarativa
let resultado;
//se agregan al final 
resultado = [...carrito,product];
resultado = [...resultado,product2];
//se agrega al inicio 
resultado=[product3,...resultado];

console.table(resultado);