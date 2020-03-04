import { firestore } from 'api/firebase/firestore';
import { itemProperties } from 'ui/helpers/data-checking';

const activeSpeciesListeners = [];
const activeTaxonListeners = [];

export const listenForActiveSpecies = listener => {
    activeSpeciesListeners.push(listener);
};
export const listenForTaxonSelection = listener => {
    activeTaxonListeners.push(listener);
};

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
            activeSpeciesListeners.forEach(l => l(species));
            updateActiveSpecies(species);

        }
    });
};

const updateActiveSpecies = species => {

    window.snapdragon.species = species;
    
    const activeSpecies = document.querySelector('.js-active-species');    
          activeSpecies.querySelector('span:nth-child(2)').innerHTML = !!species.vernacularName
            ? `${species.name} (${species.vernacularName})`
            : `${species.name} (${itemProperties.getVernacularName(species, { language: 'en'})})`;            
};

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
            console.log(input.value);
            const taxon = await firestore.getTaxonByName({},input.value);
            listener(taxon);
            activeSpeciesListeners.forEach(l => l(taxon));   
        }
    });
};