import { renderTemplate } from 'ui/helpers/templating';

import definitionTemplate from 'ui/screens/lists/species-list-definition-insert.html';

let currentlyActiveRow = null;
let currentlyActiveSpecies;

export const onSpeciesChangeHandler = species => {

    try {

        const id = species.id;
        const tr = document.querySelector(`#id_${id}`);

        currentlyActiveRow = tr;
        currentlyActiveSpecies = species;
        
    } catch(e) {
        console.log('error in onSpeciesChangeHandler');
        console.error('error message: ', e.message);
    }
};

export const openNoteHandler = note => {

    console.log(note);

    const parent = document.getElementById('insertParent');
    if(parent) parent.remove();

    const template = document.createElement('template');
          template.innerHTML = definitionTemplate;

    const insert = document.createElement('div');
          insert.setAttribute('id', 'insertParent');

    if(!currentlyActiveRow) {
        // first row, before any species have been matched
        currentlyActiveRow = document.querySelector('.js-list-item'); // first by default
    }

    currentlyActiveRow.parentElement.insertBefore(insert, currentlyActiveRow);

    renderTemplate({ note }, template.content, document.getElementById('insertParent'));
};
