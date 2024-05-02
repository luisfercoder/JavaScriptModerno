import Notification from "./classes/Notifications.js";
import adminAppointments from "./classes/AdminAppoint.js";
import { appointmentObj,editing } from "./variables.js";
import { form, formInput,inputPatient,inputOwner, inputDate, inputMail, inputSymptoms} from "./selectores.js";
//Functions
export function appointmentData (e){
  appointmentObj[e.target.name] = e.target.value
}

const appointments = new adminAppointments()
export function submitAppointment(e){
  e.preventDefault();
  if(Object.values(appointmentObj).some(valor => valor.trim()==='')){
     new Notification({
      text: 'Todos los campos son obligatorios',
      type:'error'
    })
    return
  }
  if(editing.value){
    appointments.edit({...appointmentObj})
    new Notification({
      text: 'Guardado Correctamente',
      type:'exito'
    })
  }else{
    appointments.add({...appointmentObj})
    new Notification({
      text: 'Paciente Registrado',
      type:'exito'
    })
  }
  form.reset()
  resetObjectAppointment()
  formInput.value = 'Registrar Paciente'
  editing.value = false
}

export function resetObjectAppointment(){
  //Reiniciar el objeto 
  // appointmentObj.paciente = '';
  // appointmentObj.propietario = '';
  // appointmentObj.email = '';
  // appointmentObj.fecha = '';
  // appointmentObj.sintomas = '';
  
  Object.assign(appointmentObj, {
    id:generateId(),
    paciente : '',
    propietario : '',
    email :'',
    fecha : '',
    sintomas : ''

  })
}
export function generateId(){
  return Math.random().toString(36).substring(2) + Date.now()
}

export function chargeEdtion(appointment){
   Object.assign(appointmentObj,appointment)

   inputPatient.value = appointment.paciente
   inputOwner.value = appointment.propietario
   inputMail.value = appointment.email
   inputDate.value = appointment.fecha
   inputSymptoms.value = appointment.sintomas
    
   editing.value = true

   formInput.value = 'Guardar Cambios'
}
