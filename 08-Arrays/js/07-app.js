//Destructuring
const product ={
  nombre:"Monitor 20 pulgadas",
  precio: 300,
  disponible: true
}
const{ disponible } = product;
console.log(disponible);
//destructuring con arreglos
const numeros =[1,2,3,4,5,];
const[ primero, ...tercero]= numeros; 
//en medio 
const [ , , ,segundo] = numeros;
console.log(tercero);
console.log(segundo);