//Maps son listas DE LLAVE Y VALOR
const cliente = new Map();

cliente.set('nombre','Karen');
cliente.set('tipo','Premium');
cliente.set('saldo','300');


console.log(cliente)
console.log(cliente.size)
console.log(cliente.has('nombre'))
console.log(cliente.get('nombre')); //va a traer un valor
//cliente.delete();
//cliente.clear();

const paciente = new Map([['nombre','paciente'],['cuarto','no definido']]);

paciente.set('dr','Dr.Asignado');
paciente.set('nombre','Antonio') //Reescribe a nombre

//Se puede iterar 
paciente.forEach((datos,index)=>{
  console.log(index);
})



