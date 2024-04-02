const product = '         Monitor 20 pulgadas      ';

console.log(product);
console.log(product.length);

//Eliminar al inicio y al final el espacio 
console.log( product.trimStart() );
console.log( product.trimEnd() );
// concatenar el inicio y el final 
console.log(product.trimEnd().trimStart());