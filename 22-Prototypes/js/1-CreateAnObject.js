
//Primera forma de hacer un objeto
const client = {
  name: 'Juan',
  saldo: 500
}

console.log(client);

//Second way to create a object

function Client(name,saldo){
  this.name = name;
  this.saldo= saldo;
}
const Juan = new Client('JUAN',500);
 console.log(Juan);