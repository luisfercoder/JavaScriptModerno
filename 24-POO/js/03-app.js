class Cliente {
  constructor(nombre, saldo){
    this.nombre=nombre;
    this.saldo = saldo;
  }
  mostrarInformacion(){
    return `Cliente: ${this.nombre}, tu saldo es de ${this.saldo}`;
  }
  static bienvenida(){
    return`Bienvenido al cajero `
  }

}

//Herencia 
class Empresa extends Cliente{
  constructor(nombre, saldo, telefono, categoria){
    super(nombre,saldo);

    this.telefono=telefono;
    this.categoria = categoria;

  }
  static bienvenida(){//reescribir un metodo
    return`Bienvenido al cajero de empresa`
  }

}
const juan = new Cliente('Juan',400);
const empresa = new Empresa('Codigo con Fer ', 600, 1234566778,'Aprendizaje en linea');
console.log(Empresa);
console.log(empresa.mostrarInformacion());

console.log(Cliente.bienvenida());
console.log(Empresa.bienvenida());

