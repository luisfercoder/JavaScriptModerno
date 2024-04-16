document.addEventListener('DOMContentLoaded', function(){
  const email ={
    email: '',
    asunto:'',
    mensaje:''
  }
//seleccionar los elementos de la interfaz 
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMessage = document.querySelector('#mensaje');
const formulario = document.querySelector('#formulario');
const btnSubmit = document.querySelector('#formulario button[type="submit"]');
const btnReset = document.querySelector('#formulario button[type="reset"]');
const spinner = document.querySelector('#spinner');
const inputDestinatario = document.querySelector('#cc');


//Asignar eventos 
inputEmail.addEventListener('blur',validar);
inputAsunto.addEventListener('blur',validar);
inputMessage.addEventListener('blur',validar);
inputDestinatario.addEventListener('blur',(e)=>{
  if(e.target.value===''){
    enviarEmail(e);
  }else{
    validar(e);
  }
});

formulario.addEventListener('submit',enviarEmail)

btnReset.addEventListener('click',function(e){
  e.preventDefault();
  //reiniciar el objeto 
  resetFormulario();
})
function enviarEmail(e){
  e.preventDefault();
  spinner.classList.add('flex');
  spinner.classList.remove('hidden');
  
  setTimeout(()=>{
    spinner.classList.remove('flex');
    spinner.classList.add('hidden');
    resetFormulario();

    //Crear una alerta
    const alertaExito = document.createElement('P');
    alertaExito.classList.add ('bg-green-500', 'text-white','p-2','text-center', 'rounded-lg','mt-10','font-bold','text-sm','uppercase');
    alertaExito.textContent='Formulario Enviado Exitosamente';
    formulario.appendChild(alertaExito);
    setTimeout(()=>{
      alertaExito.remove();
    },3000);

  },3000);


}
function validar (e){
  if(e.target.value.trim() ===''){
    showAlert(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
    email[e.target.name]=('');
    comprobarEmail();
    return;
  }
  if(e.target.id==='email' &&!validarEmail(e.target.value)){
    showAlert('El email no es valido',e.target.parentElement);
    email[e.target.name]=('');
    comprobarEmail();
    return;
  }
  limpiarAlerta(e.target.parentElement);
  //Asignar los valores
  email[e.target.name]=e.target.value.trim().toLowerCase();
  //Comprobar el objeto de email
  comprobarEmail();

}
function showAlert(mensaje,referencia){
  limpiarAlerta(referencia);
  //crear una alerta en html
  const error = document.createElement("P");
  error.textContent = mensaje ;
  error.classList.add('bg-red-600','text-white','p-2','text-center');

  //Inyectar el error en el formulario
  referencia.appendChild(error);
}
function limpiarAlerta(referencia){
    //comprueba si ya existe una alerta
  const alerta = referencia.querySelector('.bg-red-600');
  if(alerta){
    alerta.remove();
  }
}
function validarEmail(email){
  const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const result = regex.test(email);
  return result;
}
function comprobarEmail(){
  if(Object.values(email).includes('')){
    btnSubmit.classList.add('opacity-50');
    btnSubmit.disabled =true;
    return;
  }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled =false;
  
}
function resetFormulario(){
    //reiniciar el objeto 
    email.email = '';
    email.asunto = '';
    email.mensaje = '';
    formulario.reset();
    comprobarEmail();
}
//Añadir un campo extra llamado CC;para añadir un destinatario extra

//El campo no es obligatorio pero en caso de tener informacion debes validar que sea un email valido 
});

// console.log(inputMessage);
