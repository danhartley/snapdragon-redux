import * as R from 'ramda';

import autocomplete from 'autocompleter';

import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';
import { speciesEditor } from 'ui/create-guide-modal/species-editor';

import speciesPickerTemplate from 'ui/create-guide-modal/species-picker-template.html';

export const renderSpeciesPicker = createGuide => {

    const { config, modal } = createGuide;

    const chosenOnes = modal.querySelector('.js-chosen');
          chosenOnes.classList.add('hide-important');

    const template = document.createElement('template');
          template.innerHTML = speciesPickerTemplate;

    const parent = modal.querySelector('.js-actions');
          parent.innerHTML = '';

    document.querySelector('.js-step-action-content .location-actions').classList.add('species-picker-actions');

    renderTemplate({}, template.content, parent);

    const addSpeciesToList = species => {
        
        if(R.contains(species, selectedSpecies)) return;

        selectedSpecies.push(species);

        config.guide.species = selectedSpecies;

        createGuide.setConfig(config);

        setTimeout(() => {            
            speciesEditor(config, modal, selectedSpecies, speciesNames, selectedSpeciesDisplay, createGuide, input);
        }, 200);
    };

    const title = modal.querySelector('.js-options');
          title.innerHTML = 'Add species by name.';

    const input = modal.querySelector("#input-species");
          input.focus();

    let speciesNames = [];

    const init = async () => {

        speciesNames = await firestore.getSpeciesNames()
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
                addSpeciesToList(input.value);
            },
            minLength: 3,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        input.addEventListener('change', event => {
            setTimeout(() => {
                const highlightedText = document.querySelector('.selected');
                if(highlightedText) {
                    input.value = highlightedText.innerText;
                    addSpeciesToList(input.value);
                }
            }, 100);
        });
    };

    init();

    let selectedSpecies = config.guide.species || [];
    
    const selectedSpeciesDisplay = modal.querySelector('.js-selected-species');
          selectedSpeciesDisplay.innerHTML = '';
    
    speciesEditor(config, modal, selectedSpecies, speciesNames, selectedSpeciesDisplay, createGuide, input);
};
