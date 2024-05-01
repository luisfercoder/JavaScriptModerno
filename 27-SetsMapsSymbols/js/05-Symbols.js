const sym = Symbol();
const sym2 = Symbol();

// if (sym===sym2){
//   console.log('Son iguales')
// }else{
//   console.log('Son diferentes')

// }

const nombre = Symbol();
const apellido = Symbol();

const persona ={};

//Agregar nombre y apellido como llaves del objeto
persona[nombre]='Juan';//Agragamos al simbol con []
persona[apellido]='Aguilar';
persona.tipoCliente ='Premiun';
persona.saldo='500';

console.log(persona);
console.log(persona[nombre]);

//Las propiedades que utilizan un symbol no son iterables


//Puedes definir una descripcion del symbol
const nombreCliente = Symbol('Nombre del cliente');
const cliente = {};

cliente[nombreCliente]='pedro'

console.log(nombreCliente)