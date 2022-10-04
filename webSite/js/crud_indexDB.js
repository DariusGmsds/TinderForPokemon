/*Create indexDB */
var db;


function useIndexDB() {
    return new Promise(function (resolve, reject) {
        let request = window.indexedDB.open("pokemon", 1);
        request.onerror = function (event) {
            console.log("error: ");
            reject(event);
        };
        request.onsuccess = function (event) {
            db = request.result;
            console.log("success: " + db);
            resolve(db);
        };
        request.onupgradeneeded = function (event) {
            db = event.target.result;
            let objectStore = db.createObjectStore("pokemon", { keyPath: "name" });
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("img", "img", { unique: false });
            objectStore.createIndex("type", "type", { unique: false });
            objectStore.createIndex("desc", "desc", { unique: false });
            objectStore.createIndex("distance", "distance", { unique: false });
            objectStore.createIndex("age", "age", { unique: false });
            objectStore.createIndex("Status", "Status", { unique: false });
        }
    });

}



/*Get all pokemon in indexDB*/
function getAllPokemon() {
    return new Promise(function (resolve, reject) {
        useIndexDB().then(function (db) {
            let transaction = db.transaction(["pokemon"], "readonly");
            let objectStore = transaction.objectStore("pokemon");
            let request = objectStore.getAll();
            request.onsuccess = function (event) {
                pokemonFavorites = request.result;
                resolve(pokemonFavorites);
            };
            request.onerror = function (event) {
                console.log("error");
                reject(Error("Object not found"));
            };
        });
    });
}

/*Get pokemon in indexDB*/
function getPokemon() {
    let transaction = db.transaction(["pokemon"], "readonly");
    let objectStore = transaction.objectStore("pokemon");
    let request = objectStore.get(pokemon.name);
    request.onsuccess = function (event) {
        console.log(request.result);
    };
    request.onerror = function (event) {
        console.log("error");
    };
}

/*Delete pokemon in indexDB*/
function deletePokemon(name) {
    
    return new Promise(function (resolve, reject) {
        useIndexDB().then(function (db) {
            let transaction = db.transaction(["pokemon"], "readwrite");
            let objectStore = transaction.objectStore("pokemon");
            let request = objectStore.delete(name);
            request.onsuccess = function (event) {
                console.log("delete");
            };
            request.onerror = function (event) {
                console.log("error");
            };
        });
    });

}

/*Update pokemon in indexDB*/
function updatePokemon() {
    let transaction = db.transaction(["pokemon"], "readwrite");
    let objectStore = transaction.objectStore("pokemon");
    let request = objectStore.put(pokemon);
    request.onsuccess = function (event) {
        console.log("update");
    };
    request.onerror = function (event) {
        console.log("error");
    };
}
