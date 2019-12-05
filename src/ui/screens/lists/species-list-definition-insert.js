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

    let parent = document.getElementById('insertParent');

    if(parent) parent.remove();

    const template = document.createElement('template');
          template.innerHTML = definitionTemplate;

    const insert = document.createElement('div');
          insert.setAttribute('id', 'insertParent');

    if(note.colCount) {
        insert.classList.add(`col-count-${note.colCount}`);
        insert.innerHTML = note.description.replace(/\r?\n/g, '<br />');
    }

    if(!currentlyActiveRow) {
        // first row, before any species have been matched
        currentlyActiveRow = document.querySelector('.js-list-item'); // first by default
    }

    currentlyActiveRow.parentElement.insertBefore(insert, currentlyActiveRow);

    if(!note.colCount) {        
        parent = document.getElementById('insertParent');
        parent.innerHTML = '';
        renderTemplate({ note }, template.content, parent);
        const noteText = document.querySelector('#insertParent > div:nth-child(1) > div:nth-child(2)');
              noteText.innerHTML =noteText.innerHTML.replace(/\r?\n/g, '<br />');
    }    
};
