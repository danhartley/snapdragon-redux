import autocomplete from 'autocompleter';

import { snapdragonCollections } from 'snapdragon-config/snapdragon-collections';
import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';
import { renderCategories } from 'ui/create-guide-modal/categories';

import speciesPickerTemplate from 'ui/create-guide-modal/species-picker-template.html';

export const renderSpeciesPicker = (modal, createGuide) => {

    const { config } = createGuide;

    const nextStepActionTxt = modal.querySelector('.js-modal-guide-navigation > div:nth-child(2) > div > span');
          nextStepActionTxt.innerHTML = 'Start Lesson';

    const actionsContainer = modal.querySelector('.js-actions');
          actionsContainer.setAttribute('style', 'justify-content: start;');

    const guideTxt = modal.querySelector('.js-guide-text');
          guideTxt.innerHTML = 'Specify the species that interest you.';

    const pickerContainer = modal.querySelector('.js-guide-header-container');
          pickerContainer.style.height = '4rem';
    const picker = pickerContainer.querySelector('.js-guide-header-container > div:nth-child(2)');
          picker.classList.remove('hide');
          picker.innerHTML = 
          `<div class="guide-text-container hide-empty">
              <input id="input-species" type="text" placeholder="Start typing a latin species name" autofocus>            
            </div>
           <div class="autocomplete-options-container hide-important" id="snapdragon-species-autocomplete" style="width:unset;"></div>`;

    const chosenOnes = modal.querySelector('.js-chosen');
          chosenOnes.classList.add('hide-important');

    const returnToCategories = () => {
        picker.classList.add('hide');
        nextStepActionTxt.innerHTML = 'Choose season';
        renderCategories(modal, createGuide);
    };

    const template = document.createElement('template');
          template.innerHTML = speciesPickerTemplate;

    const parent = modal.querySelector('.js-actions');
          parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

    const categoriesLink = modal.querySelector('.js-species-picker-link');
          categoriesLink.removeEventListener('click', returnToCategories);
          categoriesLink.addEventListener('click', returnToCategories);

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
            },
            minLength: 3,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        input.addEventListener('keypress', event => {
            if(event.keyCode == 13) {
                addSpeciesToList();
            }
        });

        input.addEventListener('change', event => {
            console.log(event.target);
        });
    };

    init();

    const reDraw = () => {
            
        selectedSpeciesDisplay.innerHTML = '';
        selectedSpecies.forEach(s => {
            selectedSpeciesDisplay.innerHTML += `<li>${s} <input id="${s}" type="checkbox" checked></li>`;
        });        

        speciesNames = speciesNames.filter(name => name.value !== input.value);

        input.value = '';

        modal.querySelectorAll('li input').forEach(checkBox => {
            checkBox.addEventListener('change', event => {

                const removedSpecies = event.target.id;

                speciesNames.push({ label: removedSpecies, value: removedSpecies});
                selectedSpecies = selectedSpecies.filter(species => species !== removedSpecies);
                
                config.guide.itemNames = selectedSpecies;

                createGuide.setConfig(config);
                
                reDraw();
            });
        })
    };

    let selectedSpecies = config.guide.itemNames || [];
    
    const selectedSpeciesDisplay = modal.querySelector('.js-selected-species');
    selectedSpeciesDisplay.innerHTML = '';
    
    reDraw();

    const addSpeciesToList = event => {
        
        selectedSpecies.push(input.value);

        const collection = snapdragonCollections.find(c => c.id === 9);

        config.collection.id = collection.id;
        config.guide = { ...collection.guide, itemNames: selectedSpecies };

        createGuide.setConfig(config);

        reDraw();
    };
};
