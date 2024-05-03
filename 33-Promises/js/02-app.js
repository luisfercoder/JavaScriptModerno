const paises = [];

function nuevoPais(pais,callback){
  paises.push(pais);
  console.log(`Agregado: ${pais}`)
  callback();

}

function mostrarPaises(){
  console.log(paises);


}

function iniciarCallcackHell(){
  setTimeout(()=>{
    nuevoPais('Alemania',mostrarPaises);
    setTimeout(()=>{
      nuevoPais('Mexico',mostrarPaises);
      setTimeout(()=>{   
        nuevoPais('Canada',mostrarPaises);

       },3000)
    },3000)
  },3000)
}

iniciarCallcackHell();