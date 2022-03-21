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
    })
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