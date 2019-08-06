import { firestore } from 'api/firebase/firestore';

export const speciesPicker = async (input, listener) => {

    let speciesNames = [];

    speciesNames = await firestore.getSpeciesNames();
    speciesNames = speciesNames[0].value;
  
    const data = {};
    for (var i = 0; i < speciesNames.length; i++) {
      data[speciesNames[i]] = null;
    }

    var instances = M.Autocomplete.init(input, {data});

    input.addEventListener('keyup', e => {
        if(e.keyCode == 13) {
            listener();
        }
    });
};