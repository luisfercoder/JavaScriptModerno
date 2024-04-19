function Client(name,saldo){
  this.name = name;
  this.saldo= saldo;
}
const Juan = new Client('JUAN',500);

function formatearCliente(cliente){
  const {name,saldo}= cliente;
  return `El cliente ${name} tiene un saldo de ${saldo}`;
}

console.log(formatearCliente(Juan));

function Empresa(name,saldo,categoria){
  this.name = name;
  this.saldo= saldo;
  this.categoria= categoria;
}
const CCJ = new Empresa('Bimbo',4000,'Alimentos');

function formatearEmpresa(Empresa){
  const {name,saldo,categoria}= Empresa;
  return `El cliente ${name} tiene un saldo de ${saldo} en la catergoria ${categoria}`;
}

console.log(formatearEmpresa(CCJ));