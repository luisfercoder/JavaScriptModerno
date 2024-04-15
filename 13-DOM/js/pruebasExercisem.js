//Seleccionar un rango del array para sumar sus elementos
//  const birdsPerDay=[1,2,3,4,5,6,7,8,9,10,11,12,13,14] ;
function birdsInWeek(birdsPerDay, week) {
  var totalBirds=0;
  for(let i=7*(week-1);i<7*week;i++){
    totalBirds += birdsPerDay[i];
  }
return totalBirds;
}
console.log(birdsInWeek([1,2,3,4,5,6,7,8,9,10,11,12,13,14],'2'));

//Modificar el incremento para que se ejecute cada 2 veces  
//  const birdsPerDay = [2, 5, 0, 7, 4, 1];
//   function fixBirdCountLog(){
//       for ( i = 0; i< birdsPerDay.length ;i+=2){
//     birdsPerDay[i]+=1;
//   }
//   return birdsPerDay;
//   }
// console.log(fixBirdCountLog());