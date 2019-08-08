import { renderTemplate } from 'ui/helpers/templating';
import { speciesPicker } from 'admin/screens/species-picker';
import { eol } from 'admin/api/eol';

import lookalikeTemplate from 'admin/screens/add-lookalike-template.html';

export const addLookalike = () => {

    let speciesSnapdragon, speciesEOL, autocompleteRef, item;

    snapdragonSpecies = window.snapdragon.species ? window.snapdragon.species.name : '';

    const init = async () => {

        const template = document.createElement('template');
        template.innerHTML = lookalikeTemplate;

        const parent = document.querySelector('#content-container');
        parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        const inputSnapdragon = document.querySelector('#input-species-snapdragon');
              inputSnapdragon.focus();

        speciesPicker(inputSnapdragon, species => {
            item = species;
            speciesSnapdragon = inputSnapdragon.value;
        });

        const asyncProgress = document.querySelector('.async-progress');
        const inputEOL = document.querySelector('#input-species-eol');

        const searchEOLCallback = (species, ref) => {
            speciesEOL = species;
            autocompleteRef = ref;
        };
    
        eol.searchEOL(inputEOL, asyncProgress, searchEOLCallback);
    };

    init();
}