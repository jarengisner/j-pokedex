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

  //Function that adds an item to the list, then creates a button li and appends it to the DOM//
  function addListItem(pokemon) {
    //selectors//
    let pokemonUnorderedList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let pokemonButton = document.createElement('button');
    //changes inner text, gives buttons a class, and appends them to the DOM//
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('poke-box');
    pokemonListItem.appendChild(pokemonButton);
    pokemonUnorderedList.appendChild(pokemonListItem);
    //event listener for showing more details//
    pokemonButton.addEventListener('click', showDetails);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  //function returns an object with keys associated to the above functions//
  return {
    add: add,
    getPokemon: getPokemon,
    addListItem: addListItem,
  };
})();

//call to test the add functionality//
//pokemonRepository.add('Charmander', 3, ['fire', 'fighting'], 2.5);

/*for each loop that prints detials for each pokemon in pokemonList, accessed through the object returned by pokemonRepository*/
pokemonRepository.getPokemon().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
