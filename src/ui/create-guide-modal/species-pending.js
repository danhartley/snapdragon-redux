import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { listenToInatRequests } from 'api/inat/inat';
import { snapdragonCollections } from 'snapdragon-config/snapdragon-collections';

import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';

import spinnerTemplate from 'ui/create-guide-modal/species-pending-template.html';

const onCloseModalListeners = [];

export const onCreateCustomLesson = listener => { 
    onCloseModalListeners.push(listener);
    console.log('onCloseModalListeners: ', onCloseModalListeners.length);
};

export const speciesPendingSpinner = (config, modal) => {

    const template = document.createElement('template');
          template.innerHTML = spinnerTemplate;

    const parent = modal.querySelector('.js-step-action-content');

    renderTemplate({ }, template.content, parent);

    const feedback = document.querySelector('.js-request-feedback');

    const renderNewLessonSummary = lesson => {

        feedback.innerHTML = `
                Your new lesson, ${lesson.name}, is ready.

                It contains ${lesson.items.length} species.

                Open the lesson to access your custom species guide.

                Review the lesson to find out what information you have retained.
            `;
        
        const icon = modal.querySelector('.icon i');
              icon.classList.remove('slow-spin');

        const close = modal.querySelector('.js-arrow-wrapper');

        setTimeout(() => {
            close.addEventListener('click', () => {
                setTimeout(() => {
                    onCloseModalListeners.forEach(listener => listener(lesson));   
                });
            });   
        });
    };

   const initInatLesson = async () => {

    const title = modal.querySelector('.js-options');
          title.innerHTML = 'Searching for matching species.';

    const { counter, collections } = store.getState();

    const lesson = snapdragonCollections.find(c => c.type === 'custom');

    lesson.name = getLessonName(config, lesson);
    lesson.id = collections.length + 10000;

    const collection = await lessonStateHandler.loadCollection(lesson, config, counter, collections);

    if(collection && collection.items && collection.items.length > 0) {
        renderNewLessonSummary(collection);
    } else {
        feedback.innerHTML = 'No species were found. Try widening your parameters.';
    }

    const OrdinalSuffixOf = i => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
    }

    let unsubscribe;

    const callback = request => {
        if(feedback) {
            feedback.innerHTML = `Making ${OrdinalSuffixOf(request.page)} request of ${request.numberOfRequests}`;
        } else {
            unsubscribe(callback);
        }
    };

    unsubscribe = listenToInatRequests(callback);
   };

   const initSelectedSpeciesLesson = async () => {

    const custom = {
        ...snapdragonCollections.find(c => c.type === 'custom-static'),
        species: config.guide.species.map(sp => {
            return {
                name: sp
            }
        })
    };

    config.collection.id = custom.id;

    const { counter, collections } = store.getState();

    const collection = await lessonStateHandler.loadCollection(custom, config, counter, collections);

    renderNewLessonSummary(collection);
   };

   config.guide.species ? initSelectedSpeciesLesson() : initInatLesson();
};

const getLessonName = (config, lesson) => {
        
    let name = lesson.name;

    if(config.guide.inatId.key.length > 0) {
        name = `Observations for ${config.guide.inatId.key}`;
    } else if(config.guide.locationLongLat) {
        name = config.guide.locationLongLat.split(',')[0];
    }
    
    return name;
};