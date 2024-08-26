//crear un objeto global y dentro crear funciones
const restaurantApp={};
restaurantApp.platillos=[
  {platillo:'Pizza',
   precio: 25
  },
  {platillo:'Hamburguesa',
   precio: 20
  },
  {platillo:'Hot Dog',
   precio: 30
  },
];
restaurantApp.funciones={
  mostrarMenu:platillos =>{
    console.log(`Bienvenidos a nuestro menu`);

    platillos.forEach((platillo,index )=> {
      console.log(`${index} : ${platillo.platillo} $${platillo.precio}`)
    });
  },
  ordernar: id=>{
    console.log(`Tu Platillo:${restaurantApp.platillos[id].platillo} se esta preparando`)
  },
  agregarPlatillo :(platillo, precio)=>{
    const nuevo = {
      platillo,
      precio
    };
    restaurantApp.platillos.push(nuevo)
  }
}
restaurantApp.funciones.agregarPlatillo('lasaña',40);
restaurantApp.funciones.agregarPlatillo('birria',50);

const {platillos }= restaurantApp;
restaurantApp.funciones.mostrarMenu(platillos);

restaurantApp.funciones.ordernar(1);