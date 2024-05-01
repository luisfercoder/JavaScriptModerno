const carrito = new Set();

carrito.add('Camisa');
carrito.add('Disco 1');
carrito.add ('Disco 2');
carrito.add ('Disco 3');

console.log(carrito)
console.log(carrito.size) //Conocer la longitud del set

console.log(carrito.has('Guitarra')) //Conocer si cierto elemnt exist  en el set
//regresa true o false

console.log(carrito.delete('Disco 3')) //Elimina los componentes que se incluyen
// carrito.clear();
carrito.forEach((producto,index,pertenece)=>{
   console.log(producto);
   console.log(index);
   console.log(pertenece);
})
console.log(carrito)

//Del siguiente arreglo , eliminar los duplicados 
const numeros = [10,20,30,40,50,10,20];
const noDuplicados = new Set(numeros);
console.log(noDuplicados);