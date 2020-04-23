import * as R from 'ramda';

import autocomplete from 'autocompleter';

import { store } from 'redux/store';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';

import editorTemplate from 'ui/create-guide-modal/species-in-guide-editor-template.html';

export const speciesInGuideEditor = (config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies, savedSpeciesNames) => {

    const spinner = modal.querySelector('.js-species-search');
    if(spinner) spinner.classList.add('hide-important');

    const template = document.createElement('template');
          template.innerHTML = editorTemplate;

    selectedSpeciesDisplay.innerHTML = ''

    renderTemplate({selectedSpecies}, template.content, selectedSpeciesDisplay);

    const getTaxa = (taxa, config, selectedSpecies) => {
        if(taxa) {           
            if(config.guide.iconicTaxa) {
                taxa.innerHTML = config.guide.iconicTaxa.map(i => i.common).join(', ');
            } else {
                taxa.innerHTML = [ ...new Set(selectedSpecies.map(ss => ss.iconicTaxon))].join(', ');
            }
        }
    }
        
    const speciesCount = modal.querySelector('.js-lesson-taxa-count');

    if(speciesCount) {
        speciesCount.innerHTML = speciesCount === 1 
            ? `There is ${selectedSpecies.length} species in this lesson.`
            : `There are ${selectedSpecies.length} species in this lesson.`;;
    }

    const taxa = modal.querySelector('.js-lesson-taxa');
    getTaxa(taxa, config, selectedSpecies);

    const input = modal.querySelector("#input-species");
    if(config.isLandscapeMode) {
        setTimeout(() => {
            input.focus();
        }, 500);
    }

    const addSpeciesToList = async species => {
        
        if(R.contains(species.name, selectedSpecies.map(ss => ss.name))) return;

        selectedSpecies.push(species);

        config.guide.species = selectedSpecies;
        config.guide.iconicTaxa = [ ...new Set(selectedSpecies.map(ss => ss.iconicTaxon)) ];

        createGuide.setConfig(config);

        speciesNames = speciesNames.filter(name => name.value !== input.value);
        input.value = '';

        const { collection } = store.getState();

        lessonStateHandler.addExtraSpeciesSelection(config, collection);

        setTimeout(() => {            
            speciesInGuideEditor(config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies, speciesNames);
        }, 250);
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
                const suggestions = speciesNames.filter(n => n.value.toLowerCase().startsWith(text) && !R.contains(n.value, selectedSpecies.map(ss => ss.name)));
                update(suggestions);
            },
            onSelect: async function(item) {
                input.value = item.label;
                const species = await firestore.getSpeciesByName(item.label);
                addSpeciesToList(species);
            },
            minLength: 3,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        input.addEventListener('change', event => {
            setTimeout(async() => {
                const highlightedText = document.querySelector('.selected');
                if(highlightedText) {
                    input.value = highlightedText.innerText;
                    const species = await firestore.getSpeciesByName(input.value);
                    addSpeciesToList(species);
                }
            }, 100);
        });
    };
    
    init();

    modal.querySelectorAll('li input').forEach(checkBox => {
        
        checkBox.addEventListener('change', event => {

            const removedSpecies = event.target.id;

            speciesNames.push({ label: removedSpecies, value: removedSpecies});
            selectedSpecies = selectedSpecies.filter(species => species.name !== removedSpecies);
            
            config.guide.species = selectedSpecies;
            config.guide.iconicTaxa = [ ...new Set(selectedSpecies.map(ss => ss.iconicTaxon)) ];

            createGuide.setConfig(config);
            
            speciesInGuideEditor(config, modal, selectedSpeciesDisplay, createGuide, selectedSpecies, speciesNames);
        });
    })
};