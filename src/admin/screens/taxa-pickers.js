import { firestore } from 'api/firebase/firestore';
import { itemProperties } from 'ui/helpers/data-checking';

export const speciesPicker = async (input, listener) => {

    let speciesNames = [];

    speciesNames = await firestore.getSpeciesNames();

    if(!speciesNames) return;

    speciesNames = speciesNames[0].value;
  
    const data = {};
    for (var i = 0; i < speciesNames.length; i++) {
      data[speciesNames[i]] = null;
    }

    var instances = M.Autocomplete.init(input, {data});

    input.addEventListener('keyup', async e => {
        if(e.keyCode == 13) {
            const species = await firestore.getSpeciesByName(input.value);
            listener(species);
            // updateActiveSpecies(species);  
        }
    });
};

// const updateActiveSpecies = species => {

//     window.snapdragon.species = species;
    
//     const activeSpecies = document.querySelector('.js-active-species');    
//           activeSpecies.querySelector('span:nth-child(2)').innerHTML = !!species.vernacularName
//             ? `${species.name} (${species.vernacularName})`
//             : `${species.name} (${itemProperties.getVernacularName(species, { language: 'en'})})`;            
// };

export const taxonPicker = async (input, listener) => {

    let taxonNames = [];

    taxonNames = await firestore.getTaxaNames();

    if(!taxonNames) return;

    taxonNames = taxonNames[0].value;
  
    const data = {};
    for (var i = 0; i < taxonNames.length; i++) {
      data[taxonNames[i]] = null;
    }

    var instances = M.Autocomplete.init(input, {data});

    input.addEventListener('keyup', async e => {
        if(e.keyCode == 13) {
            const taxon = await firestore.getTaxonByName({},input.value);
            listener(taxon);
        }
    });
};