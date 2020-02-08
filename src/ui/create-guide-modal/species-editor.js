import * as R from 'ramda';

import autocomplete from 'autocompleter';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';

import editorTemplate from 'ui/create-guide-modal/species-editor-template.html';

export const speciesEditor = (config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies) => {

    const spinner = modal.querySelector('.js-species-search');
    if(spinner) spinner.classList.add('hide-important');

    const template = document.createElement('template');
          template.innerHTML = editorTemplate;

    selectedSpeciesDisplay.innerHTML = ''

    renderTemplate({selectedSpecies}, template.content, selectedSpeciesDisplay);

    const input = modal.querySelector("#input-species");
          input.focus();

    const addSpeciesToList = species => {
        
        if(R.contains(species, selectedSpecies)) return;

        selectedSpecies.push(species);

        config.guide.species = selectedSpecies;

        createGuide.setConfig(config);

        setTimeout(() => {            
            speciesEditor(config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies);
        }, 200);
    };

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

    if(input) {
        speciesNames = speciesNames.filter(name => name.value !== input.value);
        input.value = '';
    }

    modal.querySelectorAll('li input').forEach(checkBox => {
        
        checkBox.addEventListener('change', event => {

            const removedSpecies = event.target.id;

            speciesNames.push({ label: removedSpecies, value: removedSpecies});
            selectedSpecies = selectedSpecies.filter(species => species !== removedSpecies);
            
            config.guide.species = selectedSpecies;

            createGuide.setConfig(config);
            
            speciesEditor(config, modal, selectedSpecies, speciesNames, selectedSpeciesDisplay, createGuide, input, selectedSpecies);
        });
    })
};