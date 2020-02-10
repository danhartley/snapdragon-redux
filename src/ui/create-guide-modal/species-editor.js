import * as R from 'ramda';

import autocomplete from 'autocompleter';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';

import editorTemplate from 'ui/create-guide-modal/species-editor-template.html';

export const speciesEditor = (config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies, savedSpeciesNames) => {

    const spinner = modal.querySelector('.js-species-search');
    if(spinner) spinner.classList.add('hide-important');

    const template = document.createElement('template');
          template.innerHTML = editorTemplate;

    selectedSpeciesDisplay.innerHTML = ''

    renderTemplate({selectedSpecies}, template.content, selectedSpeciesDisplay);

    // const species = modal.querySelector('.js-lesson-taxa');
    //       species.innerHTML = ?? not known at this stage taxon of species added (though could be if import with inat data)

    const speciesCount = modal.querySelector('.js-lesson-taxa-count');
    if(speciesCount) speciesCount.innerHTML = selectedSpecies.length;

    const input = modal.querySelector("#input-species");
          if(config.isLandscapeMode) input.focus();

    const addSpeciesToList = species => {
        
        if(R.contains(species, selectedSpecies)) return;

        selectedSpecies.push(species);

        config.guide.species = selectedSpecies;
        config.guide.extraSpecies.push(species);

        createGuide.setConfig(config);

        speciesNames = speciesNames.filter(name => name.value !== input.value);
        input.value = '';

        setTimeout(() => {            
            speciesEditor(config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies, speciesNames);
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

    modal.querySelectorAll('li input').forEach(checkBox => {
        
        checkBox.addEventListener('change', event => {

            const removedSpecies = event.target.id;

            speciesNames.push({ label: removedSpecies, value: removedSpecies});
            selectedSpecies = selectedSpecies.filter(species => species !== removedSpecies);
            
            config.guide.species = selectedSpecies;
            config.guide.extraSpecies = config.guide.extraSpecies.filter(sp => sp !== removedSpecies);

            createGuide.setConfig(config);
            
            speciesEditor(config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies, speciesNames);
        });
    })
};