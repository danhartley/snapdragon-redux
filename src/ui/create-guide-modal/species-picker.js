import autocomplete from 'autocompleter';

import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';

import speciesPickerTemplate from 'ui/create-guide-modal/species-picker-template.html';

export const renderSpeciesPicker = () => {

    const template = document.createElement('template');
    template.innerHTML = speciesPickerTemplate;

    const parent = document.querySelector('.js-actions');
    parent.innerHTML = '';
    renderTemplate({}, template.content, parent);

    const input = document.getElementById("inputSpecies");

    const init = async () => {

        let speciesNames = await firestore.getSpeciesNames()
        speciesNames = speciesNames[0].value;
        
        autocomplete({
            input: input,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = speciesNames.filter(n => n.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function(item) {
                input.value = item;
            },
            minLength: 3,
            debounceWaitMs: 200,
            container: 'snapdragon-species-autocomplete'
        });
    };

    init();
};
