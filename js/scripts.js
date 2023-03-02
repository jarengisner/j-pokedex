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
  function add(name, height, [...types], weight) {
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
  function addListItem(pokemon) {
    let pokemonUnorderedList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('poke-box');
    pokemonListItem.appendChild(pokemonButton);
    pokemonUnorderedList.appendChild(pokemonListItem);
  }
  //function returns an object with keys associated to the above functions//
  return {
    add: add,
    getPokemon: getPokemon,
    addListItem: addListItem,
  };
})();

//call to test the add functionality//
pokemonRepository.add('Charmander', 3, ['fire', 'fighting'], 2.5);

/*for each loop that prints detials for each pokemon in pokemonList, accessed through the object returned by pokemonRepository*/
pokemonRepository.getPokemon().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
