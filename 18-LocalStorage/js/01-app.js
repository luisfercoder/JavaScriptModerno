//Add in a local storage 
localStorage.setItem('nombre','Juan');

//Create an object and convert in a string
const product = {
  nombre : "Monitor 24 pulgadas",
  precio : 300
}

//First way to convert an object in a string
const productString = JSON.stringify( product);
localStorage.setItem('nombre',productString);

//Second way to convert an array in a string
const meses = ['Enero','Febreo','Marzo','Abril'];
localStorage.setItem('meses',JSON.stringify(meses));


const months =['January','February','March','April'];
localStorage.setItem('months',JSON.stringify(months));

