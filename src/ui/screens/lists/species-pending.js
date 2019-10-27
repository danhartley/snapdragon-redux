import { store } from 'redux/store';
import { collectionHandler } from 'ui/helpers/collection-handler';
import { renderTemplate } from 'ui/helpers/templating';
import { listenToInatRequests } from 'api/inat/inat';

import spinnerTemplate from 'ui/screens/lists/species-pending-template.html';

const onCloseModalListeners = [];

export const onCloseCreateGuideModal = listener => { 
    onCloseModalListeners.push(listener);
};

export const speciesPendingSpinner = (config, modal) => {
    
    const { collections, counter} = store.getState();

    let newCollection = { 
        id: collections.length + 100, 
        name: 'custom lesson',
        behaviour: 'dynamic',
        glossary: config.guide.iconicTaxa.map(taxon => taxon.id)
    };
    const returnedSpecies = (collection, config) => {
        newCollection = { ...newCollection, ...collection };
    };
    const callbackWhenNoResults = () => {
        console.log('no reults');
    };

    collectionHandler(newCollection, config, counter, returnedSpecies, callbackWhenNoResults);

    const template = document.createElement('template');
          template.innerHTML = spinnerTemplate;

    // const parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
    // parent.innerHTML = '';

    const parent = modal.querySelector('.js-step-action-content');
    
    renderTemplate({ }, template.content, parent);

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
        const feedback = document.querySelector('.js-request-feedback');
        if(feedback) {
            feedback.innerHTML = `Making ${OrdinalSuffixOf(request.page)} request of ${request.numberOfRequests}`;
        } else {
            unsubscribe(callback);
        }
    };

    unsubscribe = listenToInatRequests(callback);

    const close = modal.querySelector('.js-arrow-wrapper');

    close.addEventListener('click', () => {
        onCloseModalListeners.forEach(listener => listener(newCollection));
    });
};