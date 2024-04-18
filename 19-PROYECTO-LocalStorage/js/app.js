//Variables
const form = document.querySelector('#formulario');
const tweetsList = document.querySelector('#lista-tweets');
let tweets =[];

//Events
eventListeners();

function eventListeners(){
  //Cuando el usuario agrega un nuevo tweet
  form.addEventListener('submit', addTweet);
  //Cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', ()=>{
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    console.log(tweets);

    createHTML();
  });

}

//Functions
function addTweet(e){
  e.preventDefault();

  //Textare where the user write
  const tweet =document.querySelector('#tweet').value;
  //Validate
  if(tweet ===''){
    showError('Un mensaje no puede ir vacio ');
    return;//evita que se ejecuten mas lineas  de codigo 
  }

  const tweetObj = {
    id: Date.now(),
    tweet  //es igual a tweet:tweet
  }
  //Añadir al arreglo de tweets
  tweets = [...tweets,tweetObj];
   //Una vez agregado vamos a crear el HTML
   createHTML();
   
   form.reset();

}

function showError(error){
  const errorMessage = document.createElement("P");
  errorMessage.classList.add('error');
  errorMessage.textContent=error;

  //Insertarlo en el contenido 
  const content = document.querySelector('#contenido');
  content.appendChild(errorMessage);
  //Elimina la alerta en 2 seg
  setTimeout(()=>{
    errorMessage.remove();
  },1000);
}
//Muestra un listado de los tweets
function createHTML(){

  cleanHTML();

  if(tweets.length > 0 ){
    tweets.forEach(tweet =>{
      //Agregar un boton par aeliminar un item
       const btnErase = document.createElement('a');
       btnErase.classList.add('borrar-tweet');
       btnErase.textContent = 'X';

       //Añadir la funcion de eliminar
       btnErase.onclick = ()=>{
        eraseTweet(tweet.id);
       }


      //Crear el HTML
      const li = document.createElement('li');
      //Añadir el texto 
      li.textContent = tweet.tweet;
      //Asignar el boton
      li.appendChild(btnErase);
      //insertarlo en el HTML
      tweetsList.appendChild(li);
    });
  }
  sincronizeStorage();

}
//Agrega los tweet actuales a Storage
function sincronizeStorage(){
  localStorage.setItem('tweets', JSON.stringify(tweets));
}
//Elimina el tweet
function eraseTweet(id){
  tweets = tweets.filter(tweet => tweet.id != id);

  createHTML();

}
//Limpiar el HTML
function cleanHTML(){
  while(tweetsList.firstChild){
    tweetsList.removeChild(tweetsList.firstChild);
  }
}
