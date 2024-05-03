const form = document.querySelector('#formulario');

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
