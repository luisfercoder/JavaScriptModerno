const usuario ={
  nombre:'Fer',
  edad:22,
  informacion(){
    console.log(`Mi nombre es ${this.nombre} y mi edad es ${this.edad}`)
  },
  mascota:{
    nombre:'Bolita',
    edad:2,
    informacion(){
      console.log(`Mi nombre es ${this.nombre} y mi edad es ${this.edad}`)
    }
  }
}

usuario.informacion();
usuario.mascota.informacion();