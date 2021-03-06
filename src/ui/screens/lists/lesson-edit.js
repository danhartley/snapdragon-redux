import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { speciesInGuideEditor } from 'ui/create-guide-modal/species-in-guide-editor';

import lessonEditTemplate from 'ui/screens/lists/lesson-edit-template.html';

export const renderEditLesson = collection => {

const init = async () => {

    const { config } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = lessonEditTemplate;

    const modal = document.querySelector('#basicModal');
    const parent = modal.querySelector('.js-modal-text');
          parent.innerHTML = '';

    renderTemplate({ collection }, template.content, parent);
    
    const header = modal.querySelector('.js-modal-text-title');
          header.innerHTML = 'Edit lesson';

    const selectedSpeciesDisplay = modal.querySelector('.js-selected-species-container');
          selectedSpeciesDisplay.innerHTML = '';
    
    const createGuide = {
        setConfig: config => {
        actions.boundUpdateConfig(config);
        }
    };

    speciesInGuideEditor(config, modal, selectedSpeciesDisplay, createGuide, collection.items);
};

init();

};