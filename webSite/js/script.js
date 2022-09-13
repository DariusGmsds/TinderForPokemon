// Language: javascript
// Path: js\script.js
"use strick";

// create object pokemon
let pokemon = {
    name: "Pikachu",
    img: "1",
    type: "Electric",
    desc: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    distance: "10"
}

const longitude = 46.19572785502037;
const latitude = 6.110309768148666;

let pokemonFavorites = [];
let pokemonSee = [];

// Make a function put 


// create function in favorites but if exit in list dont push
function addFavorites() {
    if (pokemonFavorites.length == 0) {
        pokemonFavorites.push(pokemon);
    } else {
        for (let i = 0; i < pokemonFavorites.length; i++) {
            if (pokemonFavorites[i].name == pokemon.name) {
                return;
            }
        }
        pokemonFavorites.push(pokemon);
    }
}



function getPokemonName(pokemonNum) {
    // make a variable to store the api url
    let pokemonNumChara = Math.floor(Math.random() * 30) + 1;
    let pokemonLong = Math.floor(Math.random() * 300) + 1;
    let pokemonMani = Math.floor(Math.random() * 300) + 1;
    let url1 = "https://pokeapi.co/api/v2/pokemon/" + pokemonNum;
    let url2 = "https://pokeapi.co/api/v2/characteristic/" + pokemonNumChara;
    // make a variable to store the api data
    fetch(url1)
        .then(response => response.json())
        .then(data => {
            pokemon = new Object();
            // make a variable to store the pokemon name
            pokemon.name = data.name;
            // make a variable to store the pokemon image
            pokemon.img = data.sprites.front_default;
            // make a variable to store the pokemon type
            pokemon.type = data.types[0].type.name;
            fetch(url2)
                .then(response => response.json())
                .then(data => {
                    pokemon.desc = data.descriptions[3].description;
                    pokemon.distance = distance(longitude, latitude, pokemonLong, pokemonMani).toFixed(0);
                    showpokemon();

                })
                .catch(error => console.log(error));
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


function randomPokemon() {
    let pokemonNum = Math.floor(Math.random() * 300) + 1;
    getPokemonName(pokemonNum);
}

function showpokemon() {
    document.getElementById('pokemonImg').src = pokemon.img;
    document.getElementById('pDescription').innerHTML = "Name : " + pokemon.name + "<br>";
    document.getElementById('pDescription').innerHTML += "Type : " + pokemon.type + "<br>";
    document.getElementById('pDescription').innerHTML += "Description : " + pokemon.desc + " - " + pokemon.distance + "m";

}

// Finde distance
function distance(lon1, lat1, lon2, lat2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1).toRad();  // Javascript functions in radians
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

/** Converts numeric degrees to radians */
if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}





