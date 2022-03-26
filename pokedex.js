var form = document.getElementById("searchForm");

function handleForm(event) {
    event.preventDefault();
} 

form.addEventListener('submit', handleForm);

var stats = [
    {name: 'hp', value: 0, max_value: 255, display_units: 0},
    {name: 'attack', value: 0, max_value: 181, display_units: 0},
    {name: 'defense', value: 0, max_value: 230, display_units: 0},
    {name: 'specialAttack', value: 0, max_value: 180, display_units: 0},
    {name: 'specialDefense', value: 0, max_value: 230, display_units: 0},
    {name: 'speed', value: 0, max_value: 200, display_units: 0}
];

var specs = {
    number: 0,
    name: '',
    types: [],
    height: 0,
    weight: 0,
}

var langDict = {
    bug: 'bicho',
    dragon: 'dragón',
    fairy: 'hada',
    fire: 'fuego',
    ghost: 'fantasma',
    ground: 'tierra',
    normal: 'normal',
    psychic: 'psíquico',
    steel: 'acero',
    dark: 'siniestro',
    electric: 'eléctrico',
    fighting: 'lucha',
    flying: 'volador',
    grass: 'planta',
    ice: 'hielo',
    poison: 'veneno',
    rock: 'roca',
    water: 'agua',
}

function clearDivs() {
    var statUnitDivs = document.getElementsByClassName('levelUnit');
    var statNameDivs = document.getElementsByClassName('statName');
    var specsA = document.getElementById('specsA').children;
    var specsB = document.getElementById('specsB').children;

    for (var i = 0; i < statUnitDivs.length; i++) {
        statUnitDivs[i].classList.remove('visible');
        statUnitDivs[i].classList.add('hidden');
    }

    for (var i = 0; i < statNameDivs.length; i++) {
        statNameDivs[i].classList.remove('visible');
        statNameDivs[i].classList.add('hidden');
    }

    for (var i = 0; i < specsA.length; i++) {
        specsA[i].textContent = '';
    }

    for (var i = 0; i < specsB.length; i++) {
        specsB[i].textContent = '';
    }
}

function showNotFound() {
    pokeImage('./img/pokeball2.webp');
    var specsA = document.getElementById('specsA').children;
    specsA[0].textContent = 'Pokemon no encontrado :(';
}

function showStats(stat_name, stat_units) {
    var statUnitDivs = document.getElementById(stat_name).children;
    var statNameDivs = document.getElementsByClassName('statName');

    for (var i = 0; i < statNameDivs.length; i++) {
        statNameDivs[i].classList.remove('hidden');
        statNameDivs[i].classList.add('visible');
    }

    for (var i = 0; i < 15 - stat_units; i++) {
        statUnitDivs[i].classList.remove('hidden');
        statUnitDivs[i].classList.add('visible');
        statUnitDivs[i].classList.remove('levelUnitOn');
        statUnitDivs[i].classList.add('levelUnitOff');
    }

    for (var i = 15-stat_units; i < 15; i++) {
        statUnitDivs[i].classList.remove('hidden');
        statUnitDivs[i].classList.add('visible');
        statUnitDivs[i].classList.remove('levelUnitOff');
        statUnitDivs[i].classList.add('levelUnitOn');
    }
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showSpecs() {
    var specsA = document.getElementById('specsA').children;
    var specsB = document.getElementById('specsB').children;
    
    specsA[0].textContent = 'No. ' + specs.number;
    specsA[1].textContent = capFirstLetter(specs.name);
    specsA[2].textContent = 'Tipo:'
    for (var i = 0; i < specs.types.length; i++) {
        if (i != 0) {
            specsA[2].textContent += ','
        }
        specsA[2].textContent += ' ' + capFirstLetter(langDict[specs.types[i].type.name]);
    }

    specsB[0].textContent = 'Altura: ' + specs.height + 'm';
    specsB[1].textContent = 'Peso: ' + specs.weight + 'kg';
}

function turnLightOn(number) {
    var colorLights = document.getElementById('smallLights').children;
    for (var i = 0; i < colorLights.length; i++) {
        if (i == number) {
            colorLights[i].classList.remove('lightOff');
            colorLights[i].classList.add('lightOn');
        } else {
            colorLights[i].classList.remove('lightOn');
            colorLights[i].classList.add('lightOff');
        }
    }
}

const fetchPokemon = () => {
    turnLightOn(1);
    const pokeInput = document.getElementById('pokeName').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            turnLightOn(0);
            clearDivs();
            showNotFound();
            return null;
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data == null || !data.sprites) {
            return 0;
        }


        for (var i = 0; i < stats.length; i++) {
            stats[i].value = data.stats[i].base_stat;
            stats[i].display_units = Math.round((15*stats[i].value) / stats[i].max_value);
            showStats(stats[i].name, stats[i].display_units);
        }

        specs.number = data.id;
        specs.name = data.name;
        specs.types = data.types;
        specs.height = data.height / 10;
        specs.weight = data.weight / 10;

        showSpecs();

        var pokeImg = new Image();
        pokeImg.onload = function() {
            turnLightOn(2);
            pokeImage(pokeImg.src);
        }
        pokeImg.src = data.sprites.other.home.front_default;
    });
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById('pokeImg');
    pokeImg.src = url;
}