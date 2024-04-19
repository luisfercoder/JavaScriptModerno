//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minPrice = document.querySelector('#minimo');
const maxPrice = document.querySelector('#maximo');
const doors = document.querySelector('#puertas');
const transmition = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Container for results
const result = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

//generate an object with the search
const dataSearch = {
    marca: '',
    year: '',
    minPrice: '',
    maxPrice: '',
    doors: '',
    transmition: '',
    color: '',
}




//Events
document.addEventListener('DOMContentLoaded', () => {
    showCars(autos); //show the cars when you charge

    //fill the options of cars
    fillSelect();

})
//adding an event listener for selector
marca.addEventListener('change', (e) => {
    dataSearch.marca = e.target.value;
    filterCars();
});
//adding for each 
year.addEventListener('change', (e) => {
    dataSearch.year = e.target.value;
    filterCars();

});
minPrice.addEventListener('change', (e) => {
    dataSearch.minPrice = e.target.value;
    filterCars();

});
maxPrice.addEventListener('change', (e) => {
    dataSearch.maxPrice = e.target.value;
    filterCars();

});
doors.addEventListener('change', (e) => {
    dataSearch.doors = e.target.value;
    filterCars();

});
transmition.addEventListener('change', (e) => {
    dataSearch.transmition = e.target.value;
    filterCars();

});
color.addEventListener('change', (e) => {
    dataSearch.color = e.target.value;
    filterCars();

});
//Functions
function showCars(autos) {
    cleanHTML();//Erase the html previous
    autos.forEach(auto => {
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        const autoHTML = document.createElement("P");

        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}
        `;
        // insert in the HTML
        result.appendChild(autoHTML)
    })

}

function cleanHTML() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }

}

//Generate the years of select
function fillSelect() {
    for (let i = max; i >= min; i--) {
        const options = document.createElement('option');
        options.value = i;
        options.textContent = i;
        year.appendChild(options); //add the options of year at select
    }
}
function filterCars() {
    const result = autos.filter(filterMark).filter(filterYear).filter(filterMin).filter(filterMax).filter(flterDoors).filter(filterTransmition).filter(filterColor);

    // console.log(result);

    if (result.length) {
        showCars(result);
    } else {
        noResult();
    }
    
}

function noResult() {

    cleanHTML();
    const msjNoResult = document.createElement("DIV");
    msjNoResult.classList.add('alerta', 'error');
    msjNoResult.textContent = 'No Hay Resultados, Intenta con otros terminos de busqueda';
    result.appendChild(msjNoResult);


}

function filterMark(auto) {
    const { marca } = dataSearch;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}
function filterYear(auto) {
    const { year } = dataSearch;
    if (year) {
        return auto.year === parseInt(year);
    }
    return auto;
}
function filterMin(auto) {
    const { minPrice } = dataSearch;
    if (minPrice) {
        return auto.precio >= minPrice;
    }
    return auto;
}
function filterMax(auto) {
    const { maxPrice } = dataSearch;
    if (maxPrice) {
        return auto.precio <= maxPrice;
    }
    return auto;
}
function flterDoors(auto) {
    const { doors } = dataSearch;
    if (doors) {
        return auto.puertas === parseInt(doors);
    }
    return auto;
}
function filterTransmition(auto) {
    const { transmition } = dataSearch;
    if (transmition) {
        return auto.transmision === transmition;
    }
    return auto;
}
function filterColor(auto) {
    const { color } = dataSearch;
    if (color) {
        return auto.color === color;
    }
    return auto;
}