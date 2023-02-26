//IIDE to wrap the pokemon objects, containing their characteristics//
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 2,
      types: ['grass', 'poison'],
      weight: '15.2 lbs',
    },
    {
      name: 'Ivysaur',
      height: 3,
      types: ['grass', 'fighting'],
      weight: '15.2 lbs',
    },
    {
      name: 'Venasaur',
      height: 6,
      types: ['grass', 'fighting'],
      weight: '15.2 lbs',
    },
  ];
  //function used to add pokemon to the pokemonList//
  function add(name, height, [types], weight) {
    return pokemonList.push({
      name: name,
      height: height,
      types: [types],
      weight: weight,
    });
  }
  //function gets all pokemon in the pokemonList//
  function getPokemon() {
    return pokemonList;
  }
  //function returns an object with keys associated to the above functions//
  return {
    add: add,
    getPokemon: getPokemon,
  };
})();

//call to test the add functionality//
pokemonRepository.add('Charmander', 3, ['fire', 'fighting', 2.5]);

/*for each loop that prints detials for each pokemon in pokemonList, accessed through the object returned by pokemonRepository*/
pokemonRepository.getPokemon().forEach(function (pokemon) {
  if (pokemon.height > 5) {
    document.write(
      `<p>${pokemon.name}</p> <p>Height: ${pokemon.height} --- That's one tall Pokemon! </p>`
    );
    document.write('<br>');
  } else {
    document.write(
      `<p>${pokemon.name} </p> <p> Height: ${pokemon.height} </p>`
    );
    document.write('<br>');
  }
});
