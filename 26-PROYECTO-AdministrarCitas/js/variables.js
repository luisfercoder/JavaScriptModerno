import { generateId } from "./functions.js";
export let editing = {
  value : false
};

//Objeto de cita
export const appointmentObj ={
  id:generateId(),
  paciente : '',
  propietario : '',
  email :'',
  fecha : '',
  sintomas : ''
}
