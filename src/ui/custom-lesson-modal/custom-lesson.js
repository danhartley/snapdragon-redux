import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { initialiseConfig } from 'ui/helpers/location-helper';

import linkTemplate from 'ui/custom-lesson-modal/custom-lesson-template.html';

const closeModalListeners = [];

export const listenToCloseSaveLessonModal = listener => { 
    closeModalListeners.push(listener);
};

export const renderSaveLesson = (parent) => {

    const template = document.createElement('template');
          template.innerHTML = linkTemplate;

    parent.innerHTML = '';
    
    renderTemplate({}, template.content, parent);

    let collection, config, modal, name;

    const saveLessonLink = document.querySelector('.js-save');

    if(!saveLessonLink) return;

    saveLessonLink.addEventListener('click', () => {
        
        collection = store.getState().collection;
        config = store.getState().config;

        modal = document.getElementById('customLesson');

        const header = modal.querySelector('.js-modal-title');
              header.innerHTML = collection.name;

        const collectionName = collection.behaviour === 'dynamic' ? 'This lesson' : `"${collection.name}'`;
        const savedLocation = modal.querySelector('.js-saved-location');
              savedLocation.innerHTML = `${collectionName} will be saved under the '${collection.type.toUpperCase()}' tab in SAVED LESSONS. You can return to it later.`;

        const dynamicContents = modal.querySelector('.js-sd-save-lesson .js-dynamic');
        const staticContents = modal.querySelector('.js-sd-save-lesson .js-static');

        const saveProgress = (collection) => {
                
            saveLesson(collection);            
            
            closeModalListeners.forEach(listener => listener());
            
            document.querySelector('#customLesson .close').click();
        };
    
        if(collection.behaviour === 'dynamic') {

            dynamicContents.classList.remove('hide');

            const lessonName = document.getElementById('lesson');
                  
            setTimeout(() => {
                lessonName.focus();
            },500);

            const saveBtn = modal.querySelector('.js-dynamic .js-btn-save');

            lessonName.addEventListener('input', event => {
                if(event.target.value !== '') {
                    name = event.target.value;
                    saveBtn.classList.remove('disabled');
                }
            });

            saveBtn.addEventListener('click', event => {
                saveProgress(addCustomCollectionToCollections());
            });

        } else {

            staticContents.classList.remove('hide');

            const saveBtn = modal.querySelector('.js-static .js-btn-save');

            saveBtn.addEventListener('click', event => {
                saveProgress(collection);
            });
        }
    });

    const addCustomCollectionToCollections = () => {

        const guide = {
            locationPlace: name,
            locationType: 'custom',
            place: {
                name: name,
                id: 'any',
                type: 'places'
            },
            season: config.guide.season,
            iconicTaxa: collection.iconicTaxa,
            ready: true
        };

        const itemNames = collection.items.map(item => item.name);

        const { collections } = store.getState();

        const newCollection = { 
            ...collection, 
            id: collections.length + 1,
            guide, 
            behaviour: 'static',
            name, type: 'custom', 
            rangeSensitive: false, 
            speciesRange: null,
            itemNames
        };

        actions.boundUpdateCollections(newCollection);

        return newCollection;

    };

    const saveLesson = async collection => {

        const { counter, lessonPlan, lessonPlans, layout, page, lesson, score, history, bonusLayout, enums } = store.getState();

        const savedLesson = { 
            name: collection.name,
            config, collection, counter, lessonPlan, lessonPlans, layout, page, lesson, score, history, bonusLayout, enums
        };
        
        actions.boundSaveLesson(savedLesson);
        actions.boundPauseLesson();

        const initialisedConfig = await initialiseConfig(config);

        actions.boundUpdateConfig(initialisedConfig);
    };
}