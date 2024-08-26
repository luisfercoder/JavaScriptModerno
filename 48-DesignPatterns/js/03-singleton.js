//singleton 
//este no te permite crear varias intancias de una misma clase , siempre es un objeto con toda la info.

let instancia = null;
class Persona {
  constructor(nombre,email){
   if(!instancia){
    this.nombre = nombre;
    this.email = email;
    instancia = this;
   }else{
    return instancia;
   }
  } 
}

const persona = new Persona('fernando', 'correo@gmail.com');
const persona2 = new Persona('fernanda', 'correo3@gmail.com');
console.log(persona)
console.log(persona2)

