//Constructor pattern

//Definir la clase padre y heredar sobre ella
class Persona {
  constructor(nombre, email){
    this.nombre = nombre;
    this.email = email;
  }
}

//Crear una clase con cliente como clase padre
class Cliente extends Persona {
  constructor(nombre, email, empresa){
    super(nombre, email);
    this.empresa = empresa;
  }
}

//Instanciar la nueva clase o la clase padre
const cliente = new Cliente('luis','correo@gmail.com','capgemini');

const persona = new Persona('fernando','mail@gmail.com');
console.log(cliente);
console.log(persona);
