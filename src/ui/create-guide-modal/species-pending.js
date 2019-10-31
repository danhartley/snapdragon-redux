import * as R from 'ramda';

import { store } from 'redux/store';
import { collectionHandler } from 'ui/helpers/collection-handler';
import { renderTemplate } from 'ui/helpers/templating';
import { listenToInatRequests } from 'api/inat/inat';
import { snapdragonCollections } from 'snapdragon-config/snapdragon-collections';

import spinnerTemplate from 'ui/create-guide-modal/species-pending-template.html';

const onCloseModalListeners = [];

export const onCloseCreateGuideModal = listener => { 
    onCloseModalListeners.push(listener);
    console.log('onCloseModalListeners: ', onCloseModalListeners.length);
};

export const speciesPendingSpinner = (config, modal) => {

    const title = modal.querySelector('.js-options');
          title.innerHTML = 'Searching for matching species.';
    
    const { counter, collections } = store.getState();

    let lesson = R.clone(snapdragonCollections.find(c => c.id === 9));

    const returnedSpecies = (collection, config) => {
        lesson = collection;
        feedback.innerHTML = `
                Your new lesson, ${lesson.name}, is ready.

                It contains ${lesson.items.length} species.

                Open the lesson to access your custom species guide.

                Review the lesson to find out what information you have retained.
            `;
        
        const icon = modal.querySelector('.icon i');
              icon.classList.remove('slow-spin');
    };
    const callbackWhenNoResults = () => {
        console.log('no reults');
    };

    lesson.name = getLessonName(config, lesson);
    lesson.id = snapdragonCollections.length + 10000 

    collectionHandler(collections, lesson, config, counter, returnedSpecies, callbackWhenNoResults);

    const template = document.createElement('template');
          template.innerHTML = spinnerTemplate;

    const parent = modal.querySelector('.js-step-action-content');
    
    renderTemplate({ }, template.content, parent);

    const feedback = document.querySelector('.js-request-feedback');

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

    const close = modal.querySelector('.js-arrow-wrapper');

    setTimeout(() => {
        close.addEventListener('click', () => {
            setTimeout(() => {
                onCloseModalListeners.forEach(listener => listener(lesson));   
            });
        });   
    });
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