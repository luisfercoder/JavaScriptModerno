
(function(){
   const formulario = document.querySelector('#formulario');
   formulario.addEventListener('submit',validarCliente);

   function validarCliente(e){
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const telefono = document.querySelector('#telefono').value;
    const email = document.querySelector('#email').value;
    const empresa = document.querySelector('#empresa').value;
    
    const cliente ={
      nombre,
      telefono,
      email,
      empresa
    }

    if(validar(cliente)){
      console.log('Todos los campo son obligatorios');
      return;
    }
    console.log('Si se paso la validacion')
  

   }

   function validar(obj){
     return !Object.values(obj).every(input => input !=='')
   }

   

})();