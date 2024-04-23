class Cliente {
  #nombre;
  constructor(nombre, saldo){
    this.#nombre=nombre;
    this.saldo = saldo;
  }
  mostrarInformacion(){
    return `Cliente: ${this.#nombre}, tu saldo es de ${this.saldo}`;
  }
  static bienvenida(){
    return`Bienvenido al cajero `
  }

}
const juan = new Cliente('Juan',200);
console.log(juan.mostrarInformacion());


//segunda forma con get y set

class Empresa {
  #name;

  setNombre(name){
    this.#name = name;
  }

  getNombre(){
    return this.#name;
  }
}

const fer = new Empresa();
fer.setNombre('Fernando');
console.log(fer.getNombre());