/*
    Author      : Darius Gomes
    Description : CRUD indeDBFonction js
    Date        : 13.09.2022
    fichier     : script.js
*/
"use strick";


// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/es2-2022-2023/gmsds/sw.js');
}




// create object pokemon
let pokemon = {
    name: "Pikachu",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    type: "Electric",
    desc: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    distance: "10",
    age: "18",
    Status: ""
}


var path = window.location.pathname;
var page = path.split("/").pop();
console.log(page);

const longitude = 46.19572785502037;
const latitude = 6.110309768148666;

let pokemonFavorites = [];
let pokemonLiked = [];
let pokemonSee = [];

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
            pokemon.name = data.name;
            pokemon.img = data.sprites.front_default;
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
function navLike() {
    page = "like";
}

function navFav() {
    page = "favori";
}

function likedPokemon() {
    randomPokemon();
    pokemon.Status = "liked";
    putPokemonFav(pokemon);
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

function dislikedPokemon() {
    randomPokemon();
    pokemon.Status = "disliked";
}

/*Add new pokeon in indexDB*/
function addFavorites() {
    pokemon.Status = "favori";
    putPokemonFav(pokemon);
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


function showFavorites() {
    
    console.log("show");
    getAllPokemon().then(function (data) {
        pokemonFavorites = data;
        let html = "";
        for (let i = 0; i < pokemonFavorites.length; i++) {
            if (page == "liked.php") {
                if (pokemonFavorites[i].Status == "liked") {
                    html += "<div class='cardpokemon'>";
                    html += "<img src=\"" + pokemonFavorites[i].img + "\">";
                    html += "<h1 class='cardpokemon'>";
                    html += pokemonFavorites[i].name;
                    html += "</h1>";
                    html += "<button  id=" + 'btn' + i + " > X </button>";
                    html += "</div>";
                }
            } else if (page == "favorites.php") {
                if (pokemonFavorites[i].Status == "favori") {
                    html += "<div class='cardpokemon'>";
                    html += "<img src=\"" + pokemonFavorites[i].img + "\">";
                    html += "<h1 class='cardpokemon'>";
                    html += pokemonFavorites[i].name;
                    html += "</h1>";
                    html += "<button  id=" + 'btn' + i + " > X </button>";
                    html += "</div>";
                }
            }

        }
        // add event listener to all buttons
        document.getElementById("menu").innerHTML = html;
        for (let i = 0; i < pokemonFavorites.length; i++) {
            document.getElementById("btn" + i).addEventListener("click", function () {

                deletePokemon(pokemonFavorites[i].name);
                deletePokemonApi(pokemonFavorites[i].name);

            });
        }

    }).catch(function (error) { console.log(error) });

}



function onloadCustom() {
    console.log("onload");
    showFavorites();
    // randomPokemon();
    //   showpokemon();
}


/* add showFavorites in windows addlistener*/
window.addEventListener('load', onloadCustom);



function putPokemonFav(pokemon) {
    let url = "https://633bd3cdc1910b5de0caa607.mockapi.io/favori";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(pokemon),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}




function deletePokemonApi(pokemonName) {
    
    let url = "https://633bd3cdc1910b5de0caa607.mockapi.io/favori/" + pokemonName;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

