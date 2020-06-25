import{ contains } from 'ramda';

import autocomplete from 'autocompleter';

import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';

import editorTemplate from 'ui/create-guide-modal/species-editor-template.html';

const listenersToAddedSpecies = [];

export const addListenerToAddedSpecies = listener => {
    listenersToAddedSpecies.pop();  
    listenersToAddedSpecies.push(listener);
};

export const speciesEditor = (container, selectedSpeciesDisplay, selectedSpecies, savedSpeciesNames, addedSpecies) => {

    const template = document.createElement('template');
          template.innerHTML = editorTemplate;

    selectedSpeciesDisplay.innerHTML = '';

    renderTemplate({addedSpecies}, template.content, selectedSpeciesDisplay);

    const input = container.querySelector("#input-species");
          
    setTimeout(() => {
        input.focus();
    }, 500);

    const addSpeciesToList = species => {
        
        if(contains(species, selectedSpecies)) return;

        selectedSpecies.push(species);
        addedSpecies.push(species);

        speciesNames = speciesNames.filter(name => name.value !== input.value);
        input.value = '';

        listenersToAddedSpecies.forEach(listener => listener(species));

        setTimeout(() => {            
            speciesEditor(container, selectedSpeciesDisplay, selectedSpecies, speciesNames, addedSpecies);
        }, 200);
    };

    let speciesNames = savedSpeciesNames || [];

    const init = async () => {

        if(speciesNames.length === 0) {

            speciesNames = await firestore.getSpeciesNames()
            speciesNames = speciesNames[0].value.map(name => {
                return {
                    label: name,
                    value: name
                }
            });
        }

        autocomplete({
            input: input,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = speciesNames.filter(n => n.value.toLowerCase().startsWith(text) && !contains(n.value, selectedSpecies));
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

    container.querySelectorAll('li input').forEach(checkBox => {
        
        checkBox.addEventListener('change', event => {

            const removedSpecies = event.target.id;

            speciesNames.push({ label: removedSpecies, value: removedSpecies});
            selectedSpecies = selectedSpecies.filter(species => species !== removedSpecies);
                        
            speciesEditor(container, selectedSpeciesDisplay, selectedSpecies, speciesNames);
        });
    })
};