const paragraph1 = document.createElement('p');
paragraph1.textContent = 'Concierto de musica';
paragraph1.classList.add('categoria','concierto');

const paragraph2 = document.createElement('p');
paragraph2.textContent = 'Rockabilly';
paragraph2.classList.add('titulo');

const paragraph3 = document.createElement('p');
paragraph3.textContent = '$300 por persona';
paragraph3.classList.add('precio');

const info = document.createElement('div');
info.classList.add("info");
info.appendChild(paragraph1);
info.appendChild(paragraph2);
info.appendChild(paragraph3);

const imagen = document.createElement('img');
imagen.src ='img/hacer2.jpg';

const card = document.createElement("div");
card.classList.add("card");
card.appendChild(imagen);
card.appendChild(info);

const addMainDiv = document.querySelector('.contenedor-cards');
//add at begin
// addMainDiv.appendChild(card);
//add in middle
addMainDiv.insertBefore(card, addMainDiv.children[2]);

console.log(addMainDiv);