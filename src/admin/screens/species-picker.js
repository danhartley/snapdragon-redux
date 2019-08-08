import { firestore } from 'api/firebase/firestore';

const activeSpeciesListeners = [];

export const listenForActiveSpecies = listener => {
    activeSpeciesListeners.push(listener);
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
        }
    });
};