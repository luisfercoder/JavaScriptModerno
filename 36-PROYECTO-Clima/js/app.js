const container = document.querySelector('.container');
const result = document.querySelector('#resultado');
const form = document.querySelector('#formulario');

window.addEventListener('load',()=>{
  form.addEventListener('submit', searchWeather);
})

function searchWeather(e){
  e.preventDefault();
  //Validar 
  const city = document.querySelector('#ciudad').value
  const country = document.querySelector('#pais').value
   
  if(city === ''|| country ===''){
    //Hubo un error
    showError ('Ambos campos son obligatorios');
    return;
  }
  //Consultar la API
  consultAPI(city,country);

}

function showError(message){
  const alert = document.querySelector('.bg-red-100');
  if(!alert){
    console.log('Ya hay una')
      //Crear una alerta
      const alert = document.createElement('DIV');
      alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md','mx-auto', 'mt-6', 'text-center');
      alert.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class ="block">${message}</span>
      `;
      container.appendChild(alert);

      setTimeout(()=>{
        alert.remove();

      },2000);

  }

}
function consultAPI(city,country){
  const appId = '15e137d9d313c1fbcbced1f122d05f89';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

  spinner();//Muestra un spinner de carga

  fetch(url)
  .then(answer => answer.json())
  .then(data => {
    clearHTML();//LIMPIAR html previo 
    if(data.cod === '404'){
      showError('Ciudad no encontrada');
      return;
    }

    //Imprime la respuesta en el HTML
    showWeather(data);
  })
}

function showWeather(data){
  const {name,main: {temp, temp_max, temp_min }}=data;
  const centigrados = kelvinToCelsius(temp);
  const min = kelvinToCelsius(temp_min);
  const max = kelvinToCelsius(temp_max);

  const cityName = document.createElement('p');
  cityName.textContent = `Clima en ${name}`;
  cityName.classList.add ('font-bold','text-2xl')


  const actual = document.createElement('p');
  actual.innerHTML = `${centigrados} &#8451;`;  
  actual.classList.add('text-6xl', 'font-bold');

  const tempMax = document.createElement('p');
  tempMax.innerHTML = `Max: ${max} &#8451;`;  
  tempMax.classList.add('text-xl');

  const tempMin = document.createElement('p');
  tempMin.innerHTML = `Min: ${min} &#8451;`;  
  tempMin.classList.add('text-xl');

  const resultDiv = document.createElement('div');
  resultDiv.classList.add('text-center','text-white');
  resultDiv.appendChild(cityName);
  resultDiv.appendChild(actual);
  resultDiv.appendChild(tempMax);
  resultDiv.appendChild(tempMin);


  result.appendChild(resultDiv);

}
const kelvinToCelsius = grades => parseInt(grades-273.15);


function clearHTML(){
  while(result.firstChild){
    result.removeChild(result.firstChild);
  }
}

function spinner (){
   
  clearHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('.sk-fading-circle');
  divSpinner.innerHTML =`
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
`;
  result.appendChild(divSpinner);
}