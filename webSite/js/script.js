// Language: javascript
// Path: js\script.js
"use strick";


// create object pokemon
let pokemon = {
    name: "Pikachu",
    img: "1",
    type: "Electric",
    desc: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    distance: "10",
    age: "18",
    Status: ""
}

const longitude = 46.19572785502037;
const latitude = 6.110309768148666;

let pokemonFavorites = [];
let pokemonSee = [];

// Make a function put 


// Old function
// function addFavorites() {
//     if (pokemonFavorites.length == 0) {
//         pokemonFavorites.push(pokemon);
//     } else {
//         for (let i = 0; i < pokemonFavorites.length; i++) {
//             if (pokemonFavorites[i].name == pokemon.name) {
//                 return;
//             }
//         }
//         console.log("add");
//         pokemonFavorites.push(pokemon);
//     }
//     console.log(pokemonFavorites);
// }



function getPokemonName(pokemonNum) {
    // make a variable to store the api url
    let pokemonNumChara = Math.floor(Math.random() * 30) + 1;
    let age = Math.floor(Math.random() * 20) + 1;
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
            pokemon.age = age + 18;
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
    let pokemonNum = Math.floor(Math.random() * 905) + 1;
    getPokemonName(pokemonNum);
}

function showpokemon() {
    document.getElementById('pokemonImg').src = pokemon.img;
    document.getElementById('pDescription').innerHTML = "Name : " + pokemon.name + " / Age : " + pokemon.age + "<br>";
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



/*Add new pokeon in indexDB*/
function addFavorites() {
    let transaction = db.transaction(["pokemon"], "readwrite");
    let objectStore = transaction.objectStore("pokemon");
    let request = objectStore.add(pokemon);
    request.onsuccess = function (event) {
        console.log("add");
    };
    request.onerror = function (event) {
        console.log("error");
    };
}


/*create list in html #favoritesMenu white pokemonFavorites list*/
function showFavorites() {
    console.log("show");
    getAllPokemon().then(function (data) {
        pokemonFavorites = data;
        let html = "";
        for (let i = 0; i < pokemonFavorites.length; i++) {

            // create a div to store the pokemon name
            html += "<div class='cardpokemon'>";
            html += "<div class='pokemonName'>";
            html += pokemonFavorites[i].name;
            html += "</div>";
            // create a div to store the pokemon image
            html += "<div class='pokemonImg'>";
            html += "<img src='" + pokemonFavorites[i].img + "' alt='pokemon image'>";
            html += "</div>";
            // create a div to store the pokemon type
            html += "<div class='pokemonType'>";
            html += pokemonFavorites[i].type;
            html += "</div>";
            html += "</div>";
        }
        document.getElementById('favoritesMenu').innerHTML = html;
    }).catch(function (erro) { });

}

function onloadCustom(){
    console.log("onload");
    showFavorites();
   // randomPokemon();
 //   showpokemon();
}


/* add showFavorites in windows addlistener*/
window.addEventListener('load',  onloadCustom);
   