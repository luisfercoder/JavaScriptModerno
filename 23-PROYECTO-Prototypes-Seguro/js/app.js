//Constructores 
function insurance(mark,year,type){
  this.mark = mark;
  this.year = year;
  this.type = type;
}
//Realiza la cotizacion con los datos 
insurance.prototype.quotingInsurance = function(){
  // 1=Americano 1.5
  // 2= Asiatica 1.05
  //3 = Europeo 1.35
  let quantity;
  const base = 2000;
  switch(this.mark){
    case '1':
      quantity = base * 1.5;
      break;
    case '2':
      quantity = base * 1.05;
      break;
    case '3':
      quantity = base * 1.35;
      break;
    default:
      break;
  }
  //Leer el año 
  const diference = new Date().getFullYear()- this.year;

  //Cada año que la diferencia es mayor, el costo va a reducirse un 3%
  quantity -= ((diference * 3)*quantity) / 100;
  /*
    Si el seguro es basico se multiplica por un 30% mas
    Si el seguro es completo  se multiplica por un 50% mas
  */
  
  if(this.type === 'basico'){
    quantity *= 1.30;
  }else{
    quantity *= 1.50;
  }
  return quantity;
}
function UI(){}

//Llena las opciones de los años
UI.prototype.fillOptions = ()=>{
  const max = new Date().getFullYear(),
        min = max -20;

        const selectYear = document.querySelector('#year');
        for( let i = max; i > min;i-- ){
          let option = document.createElement("option");
          option.value = i;
          option.textContent = i;
          selectYear.appendChild(option);
        }
} 
//Muestra alertas en pantalla
UI.prototype.showMessage =(message,tipo)=>{
  const div = document.createElement('div');

  if(tipo === 'error'){
    div.classList.add('error');
  }else{
    div.classList.add('correcto');
  }
  div.classList.add('message','mt-10');
  div.textContent = message;

  //Insertar en el html
  const form = document.querySelector('#cotizar-seguro');
  form.insertBefore(div,document.querySelector('#resultado'));

  setTimeout(()=>{
    div.remove();
  },2000);

}
UI.prototype.showResult = (total, Insurance)=>{
  const { mark, year, type } = Insurance;
  let textMark;
  switch(mark){
    case '1':
      textMark = 'Americano';
      break;
    case '2':
      textMark = 'Asiatico';
      break;
    case '3':
      textMark = 'Europeo';
      break;
    default:
      break;
  }
  //Crear el resultado 
  const div = document.createElement('div');
  div.classList.add('mt-10');
  div.innerHTML = `
     <p class="header">Tu resumen </p>
     <p class="font-bold">Marca: <span class="font-normal"> ${textMark}</span></p>
     <p class="font-bold">Año: <span class="font-normal">  ${year}</span></p>
     <p class="font-bold">Tipo: <span class="font-normal capitalize">  ${type}</span></p>
     <p class="font-bold">Total: <span class="font-normal"> $ ${total}</span></p>
     `;

  const resultDiv = document.querySelector('#resultado');
   //Mostrar el spinner
   const spinner = document.querySelector('#cargando');
   spinner.style.display = 'block';

   setTimeout(()=>{
    spinner.style.display = 'none';//Se borra el spinner
    resultDiv.appendChild(div); //se muestra el resultado   
   },2000);


}
//instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded',()=>{
  ui.fillOptions();//Llena el select con los años
})


eventListeners();
function eventListeners(){
  const form = document.querySelector('#cotizar-seguro')
  form.addEventListener('submit', quoteInsurance);

}

function quoteInsurance(e){
  e.preventDefault();
  //Leer la marca selecionada
  const mark = document.querySelector('#marca').value;
  //Leer el año selecionado
  const year = document.querySelector('#year').value;
  //Leer el tipo de cobertura
  const type = document.querySelector('input[name="tipo"]:checked').value;

  if(mark === ''|| year === ''||type ===''){
    ui.showMessage('Todos los campo son obligatorios','error');
    return;
  }

  ui.showMessage('Cotizando...','exito');
  //Ocultar las cotizaciones previas 
  const results= document.querySelector('#resultado div');
  if(results != null ){
    results.remove();
  }
  //Instancair el seguro 
  const Insurance = new insurance(mark, year,type);
  const total = Insurance.quotingInsurance();
 //Utilizar el prototype qeu va a cotizar
  ui.showResult(total,Insurance);

}