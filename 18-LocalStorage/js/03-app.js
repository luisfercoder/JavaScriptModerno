localStorage.removeItem('nombre');


const meses = ['Enero','Febreo','Marzo','Abril'];
localStorage.setItem('meses',JSON.stringify(meses)); 

const mesesArray = JSON.parse(localStorage.getItem('meses'));
console.log(mesesArray);
mesesArray.push('Nuevo mes');
console.log(mesesArray);
localStorage.setItem('meses',JSON.stringify(mesesArray));