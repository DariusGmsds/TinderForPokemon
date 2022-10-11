<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="manifest" href="pokePwa.webmanifest">
    <title>Test tinder pokemon</title>
</head>

<body>
    <main>
        <h1>Tinder for pokemon</h1>
        <div id="pokemonScreen">
            <img id="pokemonImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
                alt="pokemon">
            <div id="desc">
                <p id="pDescription">
                    Description 
                </p>
            </div>
        </div>
        <hr>
            <nav id="navBtnOption">
                <button id="btnDislike" onclick="dislikedPokemon()">
                </button><button id="btnFavori" onclick="addFavorites()"></button>
                <button id="btnLike" onclick="likedPokemon()"></button>
            </nav>
            <?php include 'lib/nav.html'; ?>
           
    </main>
    <script src="js/script.js" ></script>
    <script src="js/crud_indexDB.js" onload="useIndexDB()"></script>
</body>

</html>