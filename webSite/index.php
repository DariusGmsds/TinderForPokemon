<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
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
            <nav id="navBtnOption">
                <button id="btnDislike" onclick="randomPokemon()">
                </button><button id="btnFavori" onclick="addFavorites()"></button>
                <button id="btnLike" onclick="randomPokemon()"></button>
            </nav>
            <?php include 'nav.html'; ?>
           
    </main>
    <script src="js/script.js"></script>
</body>

</html>