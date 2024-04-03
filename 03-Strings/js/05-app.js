const product ='Monitor 20 pulgadas';
//.replace para reemplazar
console.log(product);
console.log(product.replace('pulgadas','"'));
console.log(product.replace('Monitor','Monitor Curvo'));

//.slice para cortar
console.log(product.slice(0,10) );
//alternative a slice
console.log(product.substring(0,10));

//eliminar y dejar la primera letra
console.log(product.charAt(0));




