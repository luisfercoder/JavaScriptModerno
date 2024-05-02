
let DB
document,addEventListener('DOMContentLoaded',()=>{
  crmDB();
  setTimeout(()=>{
    crearCliente();
  },3000)
})
function crmDB (){
  //crear base de datos version 1.0
  let crmDB = window.indexedDB.open('crm',1);

  //si hay un error
  crmDB.onerror = function (){
    console.log('Hubo un error a l ahora de crear la BD')
  }

  //si se creo bien
  crmDB.onsuccess = function (){
    console.log('Base de datos Creada..!');

    DB = crmDB.result;
  }

  //configuracion de la base de datos
  crmDB.onupgradeneeded = function(e){
    const db = e.target.result;

    const objectStore =db.createObjectStore('crm',{
      keyPath : 'crm',
      autoIncrement : true
    });
    //Definir las columnas
    objectStore.createIndex('nombre','nombre',{unique: false});
    objectStore.createIndex('email','email',{unique: true});
    objectStore.createIndex('telefono','telefono',{unique: false});

    console.log('columnas Creadas');

  }
}

function crearCliente(){
  let transaction = DB.transaction(['crm'], 'readwrite');

  transaction.oncomplete = function (){
    console.log('Transaciion Completa')
  }
   
  transaction.onerror = function(){
    console.log('Hubo un error en la transaccion ')
  }

  const objectStore = transaction.objectStore('crm');

  const nuevoCliente = {
    telefono: 22397068,
    nombre: 'Fernando',
    email: 'correo@gmail.com'
  }
  const peticion = objectStore.add(nuevoCliente);

  console.log(peticion);
  
}