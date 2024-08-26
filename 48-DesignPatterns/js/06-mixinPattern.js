//agregar funciones a una clase

class Persona {
  constructor(nombre, email){
    this.nombre = nombre;
    this.email = email;
  }
}

class Cliente{
  constructor(cel,company){
    this.cel = cel;
    this.company = company;
  }
}
const funcionesPersona={
  mostrarInformacion(){
    console.log(`Nombre Persona: ${this.nombre} Email: ${this.email}`)
  },
  mostrarData(){
    console.log(`La empresa es: ${this.company} y el tel es ${this.cel} `)
  }
}
//Añadir funcionesPersona a la clase de Persona
Object.assign(Persona.prototype, funcionesPersona);
Object.assign(Cliente.prototype, funcionesPersona);

const cliente = new Persona ('fernando','correo@gmail.com');
const cliente2 = new Cliente('333333332342','capgemini');

console.log(cliente);
cliente.mostrarInformacion()

console.log(cliente2);
cliente2.mostrarData()