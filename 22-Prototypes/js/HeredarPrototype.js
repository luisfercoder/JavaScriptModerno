function Client(name,saldo){
  this.name = name;
  this.saldo= saldo;
}  

Client.prototype.tipoCliente = function(){
  let tipo;
  if(this.saldo > 10000){
    tipo = 'Gold'
  }else if(this.saldo > 5000){
    tipo = 'Premiun'
  }else{
    tipo = 'Normal'
  }
  return tipo;
}

Client.prototype.nombreClienteSaldo = function(){
  return `Nombre: ${this.name}, Saldo: ${this.saldo}, Tipo Cliente: ${this.tipoCliente()}`;
}

Client.prototype.retirarSaldo = function(retirar){
    this.saldo -= retirar
  
}

function Persona(name,saldo,phone){
  Client.call(this, name,saldo)
  this.phone= phone;
}

Persona.prototype = Object.create(Client.prototype);
Persona.prototype.constructor = Client;

//Instanciarlo
const fer = new Persona ('Fernando',5000,19282829292)
console.log(fer);
console.log(fer.nombreClienteSaldo());

Persona.prototype.showPhone = function(){
  return `El telefono del cliente ${this.name} es ${this.phone}`
}

console.log(fer.showPhone());