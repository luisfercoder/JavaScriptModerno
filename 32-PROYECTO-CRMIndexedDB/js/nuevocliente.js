// import { conectDB } from "./function";

(function(){

let DB;
const form = document.querySelector('#formulario');

  document.addEventListener('DOMContentLoaded',()=>{
    conectDB();

   form.addEventListener('submit',validateClient);
  });


  function validateClient (e){
    e.preventDefault();
    //Leer todos los inputs
    const name = document.querySelector('#nombre').value;
    const mail = document.querySelector('#email').value;
    const phone = document.querySelector('#telefono').value;
    const company = document.querySelector('#empresa').value;

    if(name === ''|| mail===''|| phone ===''||company ===''){
      printAlert('Todos los campos son obligatorios','error');
      return;
    }

    //Crear un objeto con la informacion 
    const client = {
      name,
      mail,
      phone,
      company,

    }
    client.id = Date.now()
    creatNewClient(client);
  }

  function creatNewClient(client){
    const transaction = DB.transaction(['crm'],'readwrite');
    const objectStore = transaction.objectStore('crm');
    objectStore.add(client);

    transaction.onerror = function (){
      printAlert('Hubo un error','error')
    };

    transaction.oncomplete = function (){
      printAlert('El cliente se agregó correctamente');

      setTimeout(()=>{
        window.location.href = "index.html";
      },2000)
    };

  }
  function conectDB(){
    const openConection = window.indexedDB.open('crm',1);
  
    openConection.onerror = function (){
      console.log('Hubo un error');
    };
    openConection.onsuccess = function(){
      DB = openConection.result;
    }
  }
  function printAlert(message,type){
    const alert = document.querySelector('.alert');
    if(!alert){
      //crear la alerta
      const divMessage = document.createElement('div');
  
      divMessage.classList.add('px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center','border','alert');
  
      if(type==='error'){
        divMessage.classList.add('bg-red-100','border-red-400','text-red-700');
      }else{
        divMessage.classList.add('bg-green-100','border-green-400','text-green-700');
      }
      divMessage.textContent= message;
  
      form.appendChild(divMessage);
      setTimeout(()=>{
        divMessage.remove();
  
      },3000)
    }
  }
  
  
  
})();