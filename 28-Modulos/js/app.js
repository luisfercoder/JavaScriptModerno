import nuevaFuncion,{ nombreCliente ,ahorro, mostrarInformacion, tieneSaldo ,Cliente} from "./cliente.js";
import { Empresa } from './empresa.js';

nuevaFuncion();
console.log(nombreCliente);
console.log(ahorro);
console.log(mostrarInformacion(nombreCliente,ahorro));
tieneSaldo(ahorro);

const cliente = new Cliente(nombreCliente,ahorro);

console.log(cliente.mostrarInformacion());

//Importar Empresa 
const empresa = new Empresa('Codeando', 100, 'Aprendizaje en Linea' );
console.log(empresa.mostrarInformacion());