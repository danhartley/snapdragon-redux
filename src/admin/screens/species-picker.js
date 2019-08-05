import autocomplete from 'autocompleter';

import { firestore } from 'api/firebase/firestore';

export const speciesPicker = async (input, listener) => {

    let speciesNames = [];

    speciesNames = await firestore.getSpeciesNames();
    speciesNames = speciesNames[0].value.map(name => {
        return {
            label: name,
            value: name
        }
    });
    
    autocomplete({
        input: input,
        fetch: function(text, update) {
            text = text.toLowerCase();
            const suggestions = speciesNames.filter(n => n.value.toLowerCase().startsWith(text))
            update(suggestions);
        },
        onSelect: function(item) {
            input.value = item.label;
        },
        minLength: 3,
        debounceWaitMs: 200,
        className: 'autocomplete-options-container'
    });

    input.addEventListener('keypress', listener);
};