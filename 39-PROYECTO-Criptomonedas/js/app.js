const criptocurrencySelect = document.querySelector('#criptomonedas');
const currencySelect = document.querySelector('#moneda');
const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');


const objSearch ={
  moneda : '',
  criptomoneda : ''
}
//Crear un promise
const obtainCriptocurrency = criptocurrency => new Promise (resolve =>{
  resolve(criptocurrency);
});

document.addEventListener('DOMContentLoaded',()=>{
  consultCriptocurrency();

  form.addEventListener('submit',submitForm);
  
  criptocurrencySelect.addEventListener('change',readValue);
  currencySelect.addEventListener('change',readValue);

})
function consultCriptocurrency(){
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

  fetch(url)
   .then(answer => answer.json())
   .then(result => obtainCriptocurrency(result.Data))
   .then(criptocurrency => selectCriptocurrency(criptocurrency))
}

function selectCriptocurrency(criptocurrency){
  criptocurrency.forEach(cripto => {
    const {FullName,Name}= cripto.CoinInfo;

    const option = document.createElement('OPTION');
    option.value = Name;
    option.textContent = FullName;
    criptocurrencySelect.appendChild(option);
    
  });
}
function readValue(e){
  objSearch[e.target.name] = e.target.value
  // console.log(objSearch);
}
function submitForm(e){
   e.preventDefault();

   //validate
   const {moneda, criptomoneda} = objSearch;

   if(moneda ===''|| criptomoneda ===''){
    showAlert('Ambos campos son obligatorios');
    return;
   }
   //Consult the API with the results
   consultAPI();
}
function showAlert(msg){
  const existError = document.querySelector('.error');
  
  if(!existError){
    let divMessage = document.createElement('DIV');
    divMessage.classList.add('error');
    //message error
    divMessage.textContent =msg;
  
    form.appendChild(divMessage);
  
    setTimeout(()=>{
      divMessage.remove()
    },2000);
  }
}
function consultAPI(){
  const {moneda, criptomoneda } = objSearch;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  
  showSpinner();
  fetch(url)
  .then(answer => answer.json())
  .then(quotation =>{
    showPriceHTML(quotation.DISPLAY[criptomoneda][moneda]);
  })
}

function showPriceHTML (quotation) {
  cleanHTML();
  let {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = quotation;
  
  let price = document.createElement('P');
  price.classList.add('precio');
  price.innerHTML = `El precio es: <span>${PRICE}</span>`;

  let priceHigh = document.createElement('P');
  priceHigh.innerHTML = `El precio mas alto del dia : <span>${HIGHDAY}</span>`;

  let priceLow = document.createElement('P');
  priceLow.innerHTML = `El precio mas bajo del dia : <span>${LOWDAY}</span> `;

  let lastHours= document.createElement('P');
  lastHours.innerHTML = `Variación ultimas 24 hrs <span>${CHANGEPCT24HOUR}</span> `;

  let lastVersion = document.createElement('P');
  lastVersion.innerHTML = `Última Actualización: <span>${LASTUPDATE}</span> `;

  result.appendChild(price);
  result.appendChild(priceHigh);
  result.appendChild(priceLow);
  result.appendChild(lastHours);
  result.appendChild(lastVersion);

}

function cleanHTML(){
  while(result.firstChild){
    result.removeChild(result.firstChild);
  }
}
function showSpinner(){
  cleanHTML();
  let spinner = document.createElement('DIV');
  spinner.classList.add('spinner');
  spinner.innerHTML  = `
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
  `;
  result.appendChild(spinner);
}