const container = document.body.querySelector('.container')

// Weight is in Hectograms, so divide by 10 for KG
// Height is in Decimeters, so multiply by 10 for centimeters

const idArray = [...Array(151).keys()].map((id) => id + 1);

let p = Promise.resolve();
for (let id of idArray) {
  p = p
    .then(() => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
    .then((response) => response.json())
    .then((data) => {
        // console.log(id);

        // Constants to access Pokemon Data
        const pokemonName = data.name[0].toUpperCase() + data.name.slice(1).toLowerCase();
        const pokemonImg = data.sprites.other['official-artwork'].front_default;
        const pokemonHeight = ((data.height) * 10);
        const pokemonWeight = ((data.weight)/10)
        const pokemonAbility = data.abilities[0].ability.name[0].toUpperCase() + data.abilities[0].ability.name.slice(1).toLowerCase();
        const pokemonTypeOne = data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1);
        // const pokemonTypeTwo = data.types[1].type.name[0].toUpperCase() + data.types[1].type.name.slice(1).toLowerCase();
        // console.log(pokemonTypeOne)


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
        heightDiv.innerText = `Height: ${pokemonHeight} Kg`;
        weightDiv.innerText = `Weight: ${pokemonWeight} cm`;
        

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
        typeDiv.innerText = pokemonTypeOne;
        if (data.types[1] != undefined) {
            let pokemonTypeTwo = data.types[1].type.name[0].toUpperCase() + data.types[1].type.name.slice(1).toLowerCase();
            typeDiv.innerText = `${pokemonTypeOne}/${pokemonTypeTwo}`;
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
    });
}

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