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

function showStats(stat_name, stat_units) {
    console.log('stat_name: ' + stat_name);
    var hpDivs = document.getElementById(stat_name).children;
    var statNameDivs = document.getElementsByClassName('statName');

    for (var i = 0; i < statNameDivs.length; i++) {
        statNameDivs[i].classList.remove('hidden');
        statNameDivs[i].classList.add('visible');
    }

    for (var i = 0; i < 15 - stat_units; i++) {
        hpDivs[i].classList.remove('hidden');
        hpDivs[i].classList.add('visible');
        hpDivs[i].classList.remove('levelUnitOn');
        hpDivs[i].classList.add('levelUnitOff');
    }

    for (var i = 15-stat_units; i < 15; i++) {
        hpDivs[i].classList.remove('hidden');
        hpDivs[i].classList.add('visible');
        hpDivs[i].classList.remove('levelUnitOff');
        hpDivs[i].classList.add('levelUnitOn');
    }

}

const fetchPokemon = () => {
    const pokeInput = document.getElementById('pokeName').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./img/pokeball.png");
        } else {
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        //let pokeImg = data.sprites.front_shiny;
        let pokeImg = data.sprites.other.home.front_default;
        pokeImage(pokeImg);
        stats[0].value = data.stats[0].base_stat;
        stats[1].value = data.stats[1].base_stat;
        stats[2].value = data.stats[2].base_stat;
        stats[3].value = data.stats[3].base_stat;
        stats[4].value = data.stats[4].base_stat;
        stats[5].value = data.stats[5].base_stat;

        console.log(stats.length);
        for (var i = 0; i < stats.length; i++) {
            console.log(i);
            stats[i].display_units = Math.round((15*stats[i].value) / stats[i].max_value);
            showStats(stats[i].name, stats[i].display_units);
        }
        
    });
}

//fetchPokemon()

const pokeImage = (url) => {
    const pokeImg = document.getElementById('pokeImg');
    pokeImg.src = url;
}



/*const print = () => {
    const pokeName = document.getElementById('pokeName').value
    console.log('I should look for ' + pokeName)
}*/