//IIDE to wrap the pokemon objects, containing their characteristics//
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
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
  function addListItem(pokemon) {
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
    pokemonListItem.appendChild(pokemonButton);
    listDiv.appendChild(pokemonListItem);
    //event listener for showing more details//
    //callback function always accepts event as its parameter, don't try to add the function here just alone like before//
    pokemonButton.addEventListener('click', function (event) {
      showDetails(pokemon);
      console.log(pokemon);
    });
  }

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
        hideLoadScreen();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadScreen();
      });
  }
  //function calls loadDetails on individual pokemon, then logs it out, connected to event listener//
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }
  //space for the showModal function//
  //instead of showdetails calling console log it will call this//
  function showModal(item) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let sprite = document.createElement('img');
    sprite.setAttribute('src', item.imageUrl);
    sprite.classList.add('poke-sprite');

    let modalTitle = document.createElement('h1');
    modalTitle.classList.add('modal-title');
    modalTitle.innerText = item.name;

    let modalText = document.createElement('p');
    modalText.classList.add('.modal-text');
    modalText.innerText = `Height: ${item.height}`;

    let modalTypesContainer = document.createElement('ul');
    modalTypesContainer.classList.add('.types-container');

    let modalCloseButton = document.createElement('button');
    modalCloseButton.classList.add('close-button');
    modalCloseButton.innerText = 'Close';
    modalCloseButton.addEventListener('click', () => {
      hideModal();
    });
    //determines what type the pokemon is and then displays that as a button for the type//
    item.types.forEach((type) => {
      typeCreator(type);
    });

    modal.appendChild(modalCloseButton);
    modal.appendChild(sprite);
    modal.appendChild(modalTitle);
    modal.appendChild(modalText);
    modal.appendChild(modalTypesContainer);
    modalContainer.appendChild(modal);
    //creates the button for the type//
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

      //add classlist here, and point it to conditional function for certain type and associate it with color//
    }
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (x) => {
    if (x.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (x) => {
    let target = x.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  //end modal space//

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
