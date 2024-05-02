import { form } from "../selectores.js";
export default class Notification {

  constructor ({text,type}){
    this.text = text
    this.type = type

    this.show();
  }
  show(){
    //crear la notificacion
    const alert = document.createElement('DIV')
    alert.classList.add('text-center','w-full', 'p-3', 'text-white', 'mt-5', 'alert', 'uppercase', 'font-bold', 'text-sm')

    //Eliminar alertas duplicadas
    const advanceWarning = document.querySelector('.alert')
    // if(advanceWarning){
    //   advanceWarning.remove()   forma 1
    // }
    advanceWarning?.remove()


    //Si es d etipo error, agrega una clase
    this.type === 'error' ? alert.classList.add('bg-red-500') : alert.classList.add('bg-green-500')
    //mensage de error
    alert.textContent = this.text
    //insertar en el formulario 
    form.parentElement.insertBefore(alert,form)

    //quitar despues de 3 seg
    setTimeout(()=>{
      alert.remove()
    },3000);
  }
}