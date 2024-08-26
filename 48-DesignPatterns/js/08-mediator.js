//comunica con diferentes objetos 

function Vendedor(nombre){
  this.nombre = nombre;
  this.sala = null;
}
Vendedor.prototype ={
  oferta:(articulo,precio)=>{
    console.log(`Tenemos el siguiente articulo ${articulo}, iniciamos con un precio de ${precio}`)
  },
  vendido:comprador =>{
    console.log(`Vendido a ${comprador}`);
  }
}
function Comprador(nombre){
  this.nombre = nombre;
  this.sala = null;
}
Comprador.prototype ={
  oferta:(cantidad, comprador)=>{
    console.log(`${comprador.nombre} : ${cantidad}`)
  }
}
function Subasta(){
 let compradores ={};
  return{
    registrar: usuario =>{
      compradores[usuario.nombre]= usuario;
      usuario.sala = this;
  }
}

//Crear objetos
const fernando = new Comprador('Fernando');
const emilio = new Comprador('Emilio');
const vendedor = new Vendedor('Vendedor de autos');
const subasta = new Subasta();
//Tienes que registrarlos
subasta.registrar(fernando);
subasta.registrar(emilio);
subasta.registrar(vendedor);

vendedor.oferta('Mustang 66',300);

fernando.oferta(350,fernando);
emilio.oferta(450,emilio);
fernando.oferta(500,fernando);
emilio.oferta(550,emilio);


vendedor.vendido('emilio');
