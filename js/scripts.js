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

/*This loop will iterate through the pokemon,
checking to see if the pokemon has a height
greater than 5, if so it will print something
different than the rest of the pokemon with
a height less than 5*/
for (i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 5) {
    document.write(
      `${pokemonList[i].name} <br> Height: ${pokemonList[i].height} --- That's one tall Pokemon! <br>`
    );
    document.write('<br');
  } else {
    document.write(
      `${pokemonList[i].name} <br> Height: ${pokemonList[i].height} <br>`
    );
    document.write('<br>');
  }
}
