const container = document.body.querySelector('.container')
const userForm = document.getElementById('user-form');
const input = document.body.querySelector('input');
const logo = document.body.querySelector('.logo');

const typeObj = {
  Bug: '#94BC4A',
  Dark: '#736C75',
  Dragon: '#6A7BAF',
  Electric: '#E5C531',
  Fairy: '#E397D1',
  Fighting: '#CB5F48',
  Fire: '#EA7A3C',
  Flying: '#7DA6DE',
  Ghost: '#846AB6',
  Grass: '#71C558',
  Ground: '#CC9F4F',
  Ice: '#70CBD4',
  Normal: '#AAB09F',
  Poison: '#B468B7',
  Psychic: '#E5709B',
  Rock: '#B2A061',
  Steel: '#89A1B0',
  Water: '#539AE2'
}


// Reloads the page when clicking the logo
logo.addEventListener('click', () => {
  location.reload();
})

// Loads and Creates Pokemon Data; Most important code!
function createPokemon(data, id) {
  // Constants to access Pokemon Data
  // Weight is in Hectograms, so divide by 10 for KG
  // Height is in Decimeters, so multiply by 10 for centimeters
  const pokemonName = data.name[0].toUpperCase() + data.name.slice(1).toLowerCase();
  const pokemonImg = data.sprites.other['official-artwork'].front_default;
  const pokemonHeight = ((data.height) * 10);
  const pokemonWeight = ((data.weight)/10)
  const pokemonAbility = data.abilities[0].ability.name[0].toUpperCase() + data.abilities[0].ability.name.slice(1).toLowerCase();
  const pokemonTypeOne = data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1);



  // DOM creation sequence for root div, image + name section
  let newPokemon = document.createElement('div')
  newPokemon.classList.add('pokemon');
  // DOM for new image 
  let newImg = document.createElement('img')
  newImg.classList.add('image');
  newImg.src = pokemonImg;

  // DOM creation for info
  let newInfo = document.createElement('div');
  newInfo.classList.add('info');

  // Appending info and Image to Pokemon container
  newPokemon.append(newImg);
  newPokemon.append(newInfo);
  container.append(newPokemon);

  // Containers in Info
  //Bar One, contains name, Height, Weight, and Cry
  let barOne = document.createElement('div');
  barOne.classList.add('barOne');
  newInfo.append(barOne);

  // Bar One elements
  let nameDiv = document.createElement('div');
  nameDiv.classList.add('pokeName');
  let heightDiv = document.createElement('div');
  heightDiv.classList.add('height');
  let weightDiv = document.createElement('div');
  weightDiv.classList.add('weight');
  let cryDiv = document.createElement('div');
  cryDiv.classList.add('cryDiv');
  barOne.append(nameDiv);
  barOne.append(heightDiv);
  barOne.append(weightDiv);
  barOne.append(cryDiv);

  // Cry Button
  let cryButton = document.createElement('input');
  cryButton.classList.add('cryButton');
  cryButton.setAttribute('type', 'image');
  cryButton.src = 'Images/transparent-speaker-icon-7.jpeg'
  cryDiv.append(cryButton);

  cryButton.addEventListener('click', () => {
      let audio = new Audio(`Gen 1 Cries/${id}.flac`);
      audio.volume = 0.3;
      audio.play();
  })

  // Inner Text for Bar One
  nameDiv.innerText = `#${id} ${pokemonName}`;
  heightDiv.innerText = `Height: ${pokemonHeight} cm`;
  weightDiv.innerText = `Weight: ${pokemonWeight} Kg`;
  

  // Bar Two, contains Ability, Types
  let barTwo = document.createElement('div');
  barTwo.classList.add('barTwo');
  newInfo.append(barTwo);

  // Bar Two Elements
  let abilityDiv = document.createElement('div');
  abilityDiv.classList.add('ability');
  let typeDiv = document.createElement('div');
  typeDiv.classList.add('type');
  barTwo.append(abilityDiv);
  barTwo.append(typeDiv);

  // Inner Text for Bar Two
  abilityDiv.innerText = `Ability: ${pokemonAbility}`;

  // Type Coloring and Assigning
  let coloredTypeOne = '';
  let coloredTypeTwo = '';
  coloredTypeOne = pokemonTypeOne;
  for (let type in typeObj) {
    let color = typeObj[type];
    if (coloredTypeOne.includes(type)) {
      // coloredTypeOne.fontcolor(color);
      coloredTypeOne = `<span style='color:${color}'>${coloredTypeOne}</span>`
    }

    typeDiv.innerHTML = coloredTypeOne;
    if (data.types[1] != undefined) {
      let pokemonTypeTwo = data.types[1].type.name[0].toUpperCase() + data.types[1].type.name.slice(1).toLowerCase();
      // coloredTypeTwo = pokemonTypeTwo;

      if (pokemonTypeTwo.includes(type)) {
        // coloredTypeTwo.fontcolor(color);
        let colorTwo = typeObj[type];
        coloredTypeTwo = pokemonTypeTwo;
        coloredTypeTwo = `<span style='color:${colorTwo}'>${coloredTypeTwo}</span>`
      }
      typeDiv.innerHTML = `${coloredTypeOne}/${coloredTypeTwo}`;
    }

  } 
  // Bar Three
  let barThree = document.createElement('div');
  barThree.classList.add('barThree');
  newInfo.append(barThree);

  // Bar Three description
  let description = document.createElement('div');
  description.classList.add('description');
  barThree.append(description);

  

  // For obtaining description;
  return fetch(data.species.url).then((response) => response.json()).then(species => {
    let pokemonDescription = species.flavor_text_entries[15].flavor_text;
    description.innerText = pokemonDescription;
  });
}


const idArray = [...Array(151).keys()].map((id) => id + 1);

  let p = Promise.resolve();
  for (let id of idArray) {
    // Makes it such that it forces the current iteration to resolve before moving on
    p = p
    .then(() => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
    .then((response) => response.json())
    .then((data) => {
        // Default Pokemon List on load
        createPokemon(data, id);


    });
}

// Once user searches, runs event
userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Clears the container div on search;
  document.querySelector('.container').innerHTML = '';

  // Constants
  const userInput = input.value.toLowerCase();
  const URL = `https://pokeapi.co/api/v2/pokemon/${userInput}`
        
  // Fetch request to obtain searched data      
  fetch(URL)
    .then(response => response.json())
    .then((newData) => {
    console.log(newData);
    const newId = newData.id;
    createPokemon(newData, newId);
  })
})






// // Iterates through API, with 1 iteration per Pokemon
// for (let i = 1; i <= 10; i++) {
    
//     $.get(`https://pokeapi.co/api/v2/pokemon/${i}/`, (data) => {
//         // Checker to see each Pokemon
//         console.log(i);

//         // Constants to access Pokemon Data
//         const pokemonName = data.name[0].toUpperCase() + data.name.slice(1).toLowerCase();
//         const pokemonImg = data.sprites.other['official-artwork'].front_default;
        
//         // DOM creation sequence for root div, image + name section
//         let newPokemon = document.createElement('div')
//         newPokemon.classList.add('pokemon');
//         // DOM for new image 
//         let newImg = document.createElement('img')
//         newImg.classList.add('image');
//         newImg.src = pokemonImg;

//         // DOM creation for info
//         let newInfo = document.createElement('div');
//         newInfo.classList.add('info');

//         // Appending info and Image to Pokemon container
//         newPokemon.append(newImg);
//         newPokemon.append(newInfo);
//         container.append(newPokemon);

//         // Containers in Info
//         //Bar One, contains name, Height, Weight, and Cry
//         let barOne = document.createElement('div');
//         barOne.classList.add('barOne');
//         newInfo.append(barOne);

//         // Bar One elements
//         let nameDiv = document.createElement('div');
//         nameDiv.classList.add('pokeName');
//         let heightDiv = document.createElement('div');
//         heightDiv.classList.add('height');
//         let weightDiv = document.createElement('div');
//         weightDiv.classList.add('weight');
//         let cryDiv = document.createElement('div');
//         cryDiv.classList.add('cry');
//         barOne.append(nameDiv);
//         barOne.append(heightDiv);
//         barOne.append(weightDiv);
//         barOne.append(cryDiv);
        

//         // Bar Two, contains Ability, Types
//         let barTwo = document.createElement('div');
//         barTwo.classList.add('barTwo');
//         newInfo.append(barTwo);

//         // Bar Two Elements
//         let abilityDiv = document.createElement('div');
//         abilityDiv.classList.add('ability');
//         let typeDiv = document.createElement('div');
//         typeDiv.classList.add('type');
//         barTwo.append(abilityDiv);
//         barTwo.append(typeDiv);

//         // Bar Three
//         let barThree = document.createElement('div');
//         barThree.classList.add('barThree');
//         newInfo.append(barThree);

//         // Bar Three description
//         let description = document.createElement('div');
//         description.classList.add('description');
//         barThree.append(description);

//     })
// }

//