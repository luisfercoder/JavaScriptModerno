function Client(name,saldo){
  this.name = name;
  this.saldo= saldo;
}  

Client.prototype.tipoCliente = function(){
  console.log('Desde mi nuevo proto!!')
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

//Instanciarlo 

const pedro = new Client('Pedro',6000)
console.log(pedro.tipoCliente());
console.log(pedro);
console.log(pedro.nombreClienteSaldo());

pedro.retirarSaldo(1000);
console.log(pedro.nombreClienteSaldo());
