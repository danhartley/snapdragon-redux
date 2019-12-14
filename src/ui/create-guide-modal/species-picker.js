import * as R from 'ramda';

import autocomplete from 'autocompleter';

import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';

import speciesPickerTemplate from 'ui/create-guide-modal/species-picker-template.html';

export const renderSpeciesPicker = createGuide => {

    const { config, modal } = createGuide;

    const step = modal.querySelector('.js-steps > .active');
          step.innerHTML = 'Picker';

    const nextStepActionTxt = modal.querySelector('.js-modal-guide-navigation > div:nth-child(2) > div > span');
          nextStepActionTxt.innerHTML = 'Fetch Species';

    createGuide.setCurrentStep(createGuide.getCurrentStep() + 1);

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
            reDraw();
        }, 200);
    };

    const input = modal.querySelector("#input-species");

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

    const reDraw = () => {
            
        selectedSpeciesDisplay.innerHTML = '';
        selectedSpecies.forEach(s => {
            selectedSpeciesDisplay.innerHTML +=
                `<li class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="${s}" checked>
                <label class="custom-control-label" for="${s}">${s}</label>
                </li>`;
        });        

        speciesNames = speciesNames.filter(name => name.value !== input.value);

        input.value = '';

        modal.querySelectorAll('li input').forEach(checkBox => {
            
            checkBox.addEventListener('change', event => {

                const removedSpecies = event.target.id;

                speciesNames.push({ label: removedSpecies, value: removedSpecies});
                selectedSpecies = selectedSpecies.filter(species => species !== removedSpecies);
                
                config.guide.species = selectedSpecies.map(ss => { name: ss });

                createGuide.setConfig(config);
                
                reDraw();
            });
        })
    };

    let selectedSpecies = config.guide.species || [];
    
    const selectedSpeciesDisplay = modal.querySelector('.js-selected-species');
          selectedSpeciesDisplay.innerHTML = '';
    
    reDraw();
};
