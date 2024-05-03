(function (){
  let DB;
  const listClient = document.querySelector('#listado-clientes');

  document.addEventListener('DOMContentLoaded',()=>{
    createDB();
    if(window.indexedDB.open('crm',1)){
      obtainClients();
    }
    listClient.addEventListener('click',eraseRegister);
  });

  function eraseRegister(e){
    if(e.target.classList.contains('eliminar')){
      const idErase = Number(e.target.dataset.cliente);
      const confirmar = confirm('Deseas eliminar este cliente?');

      if(confirmar){
        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.delete(idErase);

        transaction.oncomplete = function(){
          console.log('Eliminado...')
          e.target.parentElement.parentElement.remove();
        };
        transaction.onerror = function (){
          console.log('HUbo un error');
        }
      }

    }
  }
   //Crea la base de datos db
  function createDB(){
    const createDB = window.indexedDB.open('crm',1);

    createDB.onerror = function(){
      console.log('Hubo un error');
    };
    createDB.onsuccess = function(){
      DB = createDB.result;
    };

    createDB.onupgradeneeded = function(e){
      const db = e.target.result;
      const objectStore = db.createObjectStore('crm',{keyPath: 'id', autoincrement : true})

      objectStore.createIndex('name','name',{unique: false});
      objectStore.createIndex('mail','mail',{unique: true});
      objectStore.createIndex('phone','phone',{unique: false});
      objectStore.createIndex('company','company',{unique: false});
      objectStore.createIndex('id','id',{unique: true});

      console.log('DB creada y lista');
    }

  }
  function obtainClients (){
    const openConection = window.indexedDB.open('crm', 1);

    openConection.onerror = function(){
      console.log('Hubo un error');
    };
    openConection.onsuccess = function(){
      DB = openConection.result;
    const objectStore = DB.transaction('crm').objectStore('crm');

    objectStore.openCursor().onsuccess = function (e){
      const cursor = e.target.result;

      if(cursor){
        const{name,company,mail,phone,id} = cursor.value;
        listClient.innerHTML += 
        ` <tr>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${name} </p>
                      <p class="text-sm leading-10 text-gray-700"> ${mail} </p>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                      <p class="text-gray-700">${phone}</p>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                      <p class="text-gray-600">${company}</p>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                      <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                      <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                  </td>
              </tr>
          `;

        cursor.continue();
      }else{
        console.log('Noo hay mas registros')
      }
    }

    }
    
  }

})();