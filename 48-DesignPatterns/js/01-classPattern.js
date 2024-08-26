// Classs Pattern

class Person {
  constructor(nombre, email){
    this.nombre = nombre;
    this.email = email;
  }
}

const persona = new Person('Fernando', 'correo@gmail.com');
const persona2 = new Person('Luis','correo2@gmail.com')
console.log(persona);
