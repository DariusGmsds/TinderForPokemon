// Language: javascript
// Path: js\script.js
"use strick";

// create object pokemon
let pokemon = {
    name: "Pikachu",
    img: "10",
    type: "Electric",
}

let pokemonFavorite = [];


//make function if button btnFavorie is clicked then add the pokemon to the favorite list
function addFavorite(){
    if
    pokemonFavorite.push(pokemon);
    console.log(pokemonFavorite);
}


// make a functionto get api pokemon data in json format
function getPokemonName(pokemonNum){
    // make a variable to store the api url
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonNum;
    // make a variable to store the api data
    let pokemonData = fetch(url)
    .then(response => response.json())
    .then(data => {
        // make a variable to store the pokemon name
        pokemon.name = data.name;
        // make a variable to store the pokemon image
        pokemon.img = data.sprites.front_default;
        // make a variable to store the pokemon type
        pokemon.type = data.types[0].type.name;
        // make a variable to store the pokemon height
        // let pokemonHeight = data.height;
        // make a variable to store the pokemon weight
        // let pokemonWeight = data.weight;
        // make a variable to store the pokemon abilities
        // let pokemonAbilities = data.abilities[0].ability.name;
        // make a variable to store the pokemon moves
    })
    .catch(error => console.log(error));
}


function randomPokemon(){
    let pokemonNum = Math.floor(Math.random() * 151) + 1;
    getPokemonName(pokemonNum);
    document.getElementById('pokemonImg').src = pokemon.img;
    document.getElementById('pDescription').innerHTML = pokemon.name;
    document.getElementById('pDescription').innerHTML += " "+pokemon.type;
}






