import { containerAppointment } from "../selectores.js"
import { chargeEdtion } from "../functions.js"

export default class adminAppointments{
  constructor(){
    this.appointments =[]
  }

  add(appointment){
    this.appointments = [...this.appointments, appointment]
    this.show()
  }
  edit(appointmentUpdated){
    this.appointments = this.appointments.map(appointment => appointment.id === appointmentUpdated.id ? appointmentUpdated :appointment)
    this.show()
  }
  erase(id){
    this.appointments = this.appointments.filter(appointment =>appointment.id !== id)
    this.show()
  }

  show (){
  //Limpiar el HTML
   while(containerAppointment.firstChild){
    containerAppointment.removeChild(containerAppointment.firstChild)
   }
   //Si hay citas
   if(this.appointments.length===0){
    containerAppointment.innerHTML=`<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>`
    return
   }
   
   //Generando las citas
   this.appointments.forEach(appointment => {
    const divCita = document.createElement('div');
    divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');

    const patient = document.createElement('p');
    patient.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
    patient.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${appointment.paciente}`;

    const owner = document.createElement('p');
    owner.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
    owner.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${appointment.propietario}`;

    const email = document.createElement('p');
    email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
    email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${appointment.email}`;

    const date = document.createElement('p');
    date.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
    date.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${appointment.fecha}`;

    const symptoms = document.createElement('p');
    symptoms.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
    symptoms.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${appointment.sintomas}`;
    //Botones de Elimnar y editar 
    const btnEditar = document.createElement('button');
      btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2','btn-editar');
      btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
      const clone = structuredClone(appointment)
      btnEditar.onclick = ()=>chargeEdtion(clone)

    const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
      btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
      btnEliminar.onclick = () => this.erase(appointment.id)

      const containerBtns = document.createElement('DIV')
      containerBtns.classList.add('flex', 'justify-between','mt-10')
      containerBtns.appendChild(btnEditar)
      containerBtns.appendChild(btnEliminar)
    // Agregar al HTML
    divCita.appendChild(patient);
    divCita.appendChild(owner);
    divCita.appendChild(email);
    divCita.appendChild(date);
    divCita.appendChild(symptoms);
    divCita.appendChild(containerBtns)
    containerAppointment.appendChild(divCita);
});  

  }
}