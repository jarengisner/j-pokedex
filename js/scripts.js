//IIDE to wrap the pokemon objects, containing their characteristics//
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
  //function used to add pokemon to the pokemonList//
  function add(pokemon) {
    pokemonList.push(pokemon);
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
    //callback function always accepts event as its parameter, don't try to add the function here just alone like before//
    pokemonButton.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  //Beginning of fetch function to operate with the API//
  //Loads the list of pokemon from the pokemonAPI//
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          //Adds the pokemon generated above from API to pokemonList//
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  //loads details by fetching from individual pokemon's details url//
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  //function calls loadDetails on individual pokemon, then logs it out, connected to event listener//
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  //function returns an object with keys associated to the above functions//
  return {
    add: add,
    getPokemon: getPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();
//loads the list of pokemon from the API, then gets all those pokemon, and creates individual buttons for each//
//Updated forEach from before//
pokemonRepository.loadList().then(function () {
  pokemonRepository.getPokemon().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
