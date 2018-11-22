// console.log('hi');
// function pokeSubmit(){
//     // var param = document.getElementById("pokeInput").value;
//     var pokeURL = "http://pokeapi.co/api/v1/pokemon/" + 23;

//     $.getJSON(pokeURL, function(data){
//         //console.log(data);
//         //console.log(JSON.stringify(data, null, "  "));

// /*********** New Stuff ****************************/
//         var pokeID = data.national_id;
//         var pokeName = data.name;
//         var pokeType1 = data.types[0].name;
//         if (data.types.length == 2) {
//             var pokeType2 = data.types[1].name;
//         }
//         else var pokeType2 = null;

//         console.log("Number: ", pokeID);
//         console.log("Name: ", pokeName);
//         console.log("Type 1: ", pokeType1);
//         console.log("Type 2: ", pokeType2);
// /*********** New Stuff ****************************/
// });
// };
// pokeSubmit();


document.getElementById('pokeBut').addEventListener('click', findPoke);

var myData;

function getData(link) {
    
    return ($.ajax({
        url: `https://pokeapi.co/api/v2/` + link,
        dataType: 'json',
        async: false,
        success: function(data) {
            return data;
        }
    })).responseJSON;
}

function findPoke() {
    var num = document.getElementById('pokeInput').value
    var pokemonLink = 'pokemon/' + num
    pokemonData = getData(pokemonLink)
    console.log(pokemonData)
    var name = pokemonData.name
    var image = pokemonData.sprites.front_default
    document.getElementById("pokeName").innerHTML = name;
    document.getElementById("pokePic").src = image;
}