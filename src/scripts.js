//IIDE to wrap the pokemon objects, containing their characteristics//
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=500';
  let modalContainer = document.querySelector('#modal-container');
  //function used to add pokemon to the pokemonList//
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //function gets all pokemon in the pokemonList//
  function getPokemon() {
    return pokemonList;
  }
  //function for loading screen//
  function showLoadScreen() {
    let load = document.querySelector('.load');
    load.classList.remove('hidden');
  }
  function hideLoadScreen() {
    let load = document.querySelector('.load');
    load.classList.add('hidden');
  }

  //Function that adds an item to the list, then creates a button li and appends it to the DOM//
  //selectors//
  //attempt to show image of pokemon on main button//
  function addListItem(pokemon) {
    showLoadScreen();
    return fetch(pokemon.detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokeSprite = details.sprites.front_default;
        let listDiv = document.querySelector('#pokemon-div-id');
        let pokemonListItem = document.createElement('li');
        pokemonListItem.classList.add(
          'list-group-item',
          'col-xl-4',
          'col-lg-4',
          'col-md-6',
          'col-sm-12'
        );
        let pokemonButton = document.createElement('button');
        //changes inner text, gives buttons a class, and appends them to the DOM//
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('btn-dark', 'btn-block', 'btn-primary');
        pokemonButton.setAttribute('data-toggle', 'modal');
        pokemonButton.setAttribute('data-target', '#exampleModal');
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', pokeSprite);
        pokemonButton.appendChild(imgElement);
        pokemonListItem.appendChild(pokemonButton);
        listDiv.appendChild(pokemonListItem);
        //event listener for showing more details//
        pokemonButton.addEventListener('click', function (event) {
          showDetails(pokemon);
          console.log(pokemon);
        });
        hideLoadScreen();
      })
      .catch(function (error) {
        console.error('Could not load Pokemon');
      });
  }
  //end of the attempt//

  //Beginning of fetch function to operate with the API//
  //Loads the list of pokemon from the pokemonAPI//
  function loadList() {
    showLoadScreen();
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
          hideLoadScreen();
        });
      })
      .catch(function (e) {
        console.error(e);
        hideLoadScreen();
      });
  }

  //loads details by fetching from individual pokemon's details url//
  function loadDetails(item) {
    showLoadScreen();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        hideLoadScreen();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadScreen();
      });
  }

  //function calls loadDetails on individual pokemon, connected to event listener//
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  //space for the showModal function//
  function showModal(item) {
    let modalName = document.querySelector('.modal-title');
    let modalMain = document.querySelector('.modal-body');
    let modalFoot = document.querySelector('.modal-footer');

    modalName.innerText = '';
    modalMain.innerHTML = '';

    modalName.innerText = item.name;
    let sprite = document.createElement('img');
    sprite.setAttribute('src', item.imageUrl);
    sprite.classList.add('poke-sprite');

    let modalHeight = document.createElement('p');
    modalHeight.classList.add('.modal-text');
    modalHeight.innerText = `Height: ${item.height}`;

    let modalWeight = document.createElement('p');
    modalWeight.classList.add('.modal-text');
    modalWeight.innerText = `Weight: ${item.weight}`;

    let modalTypesContainer = document.createElement('ul');
    modalTypesContainer.classList.add('.types-container');

    item.types.forEach((type) => {
      typeCreator(type);
    });

    function typeCreator(type) {
      let typesListItem = document.createElement('li');
      typesListItem.classList.add('typeLi');
      let typeButton = document.createElement('button');
      typeButton.classList.add('buttonForType');
      typeButton.innerText = type.type.name;
      typesListItem.appendChild(typeButton);
      modalTypesContainer.appendChild(typesListItem);
      typeColor(typeButton.innerText);
      //determines the styling for the type button, based off of their type//
      function typeColor(text) {
        typeButton.classList.add(`${text}-type`);
      }
    }
    modalMain.appendChild(sprite);
    modalMain.appendChild(modalHeight);
    modalMain.appendChild(modalWeight);
    modalMain.appendChild(modalTypesContainer);
  }
  //end modal space//

  //search function//
  document
    .querySelector('.search-now')
    .addEventListener('click', function (event) {
      event.preventDefault();
      let searchObject = document.getElementById('search-input');
      pokemonRepository.search(searchObject.value);
    });
  function search(query) {
    let listDiv = document.querySelector('#pokemon-div-id');
    listDiv.innerHTML = '';

    getPokemon()
      .filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(query.toLowerCase());
      })
      .forEach((pokemon) => {
        addListItem(pokemon);
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
    search: search,
  };
})();
//loads the list of pokemon from the API, then gets all those pokemon, and creates individual buttons for each//
pokemonRepository.loadList().then(function () {
  pokemonRepository.getPokemon().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
