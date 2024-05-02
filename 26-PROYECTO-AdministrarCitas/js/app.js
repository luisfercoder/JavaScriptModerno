import { inputPatient,inputOwner,inputMail,inputSymptoms,inputDate,form } from "./selectores.js";
import { appointmentData,submitAppointment } from "./functions.js";

//Create Event Listeners
inputPatient.addEventListener('change',appointmentData);
inputOwner.addEventListener('change',appointmentData);
inputMail.addEventListener('change',appointmentData);
inputDate.addEventListener('change',appointmentData);
inputSymptoms.addEventListener('change',appointmentData);
form.addEventListener('submit',submitAppointment);
