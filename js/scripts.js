//Array of pokemon, listing characteristics such as height and type//
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

pokemonList.forEach(function (pokemon) {
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
