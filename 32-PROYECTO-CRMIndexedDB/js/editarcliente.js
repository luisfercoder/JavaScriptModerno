(function(){
  let DB;
  let idClient;
  const nameInput = document.querySelector('#nombre');
  const mailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#telefono');
  const companyInput = document.querySelector('#empresa');

  const form = document.querySelector('#formulario');



  document.addEventListener('DOMContentLoaded',()=>{
    conectDB();
    //Actualizar el registro
    form.addEventListener('submit',actualizeClient);

    //Verificar el ID  de la url 
    const parameterURL = new URLSearchParams(window.location.search);

    idClient = parameterURL.get('id');
    if(idClient){
      setTimeout(()=>{
        obtainClient(idClient);
      },100);
     
    }

  });
 function actualizeClient(e){
  e.preventDefault();
  if(nameInput.value === ''|| mailInput.value ===''|| phoneInput.value ===''||companyInput.value ===''){
    printAlert('Todos los campos son obligatorios','error');
    return;
  }

  //Actualizar cliente
  const actualizeClient = {
    name : nameInput.value,
    mail : mailInput.value,
    phone : phoneInput.value,
    company : companyInput.value,
    id : Number(idClient)
  }
  const transaction = DB.transaction(['crm'],'readwrite');
  const objectStore = transaction.objectStore('crm');

  objectStore.put(actualizeClient);

  transaction.oncomplete = function (){
    printAlert('Editado Correctamente');

    setTimeout(()=>{
      window.location.href = "index.html";
    },2000);
  };

  transaction.onerror = function(){
    printAlert('Hubo un error','error');
  }

 }
  function obtainClient (id){
    const transaction = DB.transaction(['crm'],'readwrite');
    const objectStore = transaction.objectStore('crm');

    const client = objectStore.openCursor();
    client.onsuccess = function (e){
      const cursor = e.target.result;

      if(cursor){
        if(cursor.value.id === Number(id)){
          fillForm(cursor.value);
        }
        cursor.continue();
      }
    }

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

  function fillForm(dataClient){
    const {name,mail,company,phone} = dataClient;
    nameInput.value = name;
    mailInput.value = mail;
    phoneInput.value = phone;
    companyInput.value = company;
  }


})();

