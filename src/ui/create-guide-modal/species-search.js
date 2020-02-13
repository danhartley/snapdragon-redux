import * as R from 'ramda';

import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { listenToInatRequests } from 'api/inat/inat';
import { enums } from 'ui/helpers/enum-helper';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { speciesEditor } from 'ui/create-guide-modal/species-editor';

import spinnerTemplate from 'ui/create-guide-modal/species-search-template.html';
import speciesSummaryTemplate from 'ui/create-guide-modal/species-summary-template.html';

const onCloseModalListeners = [];

export const onCreateCustomLesson = listener => { 
    onCloseModalListeners.pop();
    onCloseModalListeners.push(listener);
};

export const speciesSearch = createGuide => {

    const { config, modal, option } = createGuide;
    const { collections } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = spinnerTemplate;

    const parent = modal.querySelector('.js-step-action-content');

    renderTemplate({ }, template.content, parent);

    const feedback = document.querySelector('.js-request-feedback');

    let timer = setTimeout(() => {
        feedback.innerHTML = 'Receiving species data…';
        timer = setTimeout(() => {
            feedback.innerHTML = 'Still receiving data…';
        }, 3500);
    }, 2000);

    const renderNewCollectionSummary = collection => {

        clearTimeout(timer);

        template.innerHTML = speciesSummaryTemplate;

        feedback.innerHTML = '';

        collection.taxa = collection.iconicTaxa.map(taxon => taxon.common).join(', ');
        
        renderTemplate({ collection }, template.content, feedback);

        const icon = modal.querySelector('.icon i');
              icon.classList.remove('slow-spin');

        const close = modal.querySelector('.js-right .js-arrow-wrapper');

        setTimeout(() => {
            close.addEventListener('click', () => {
                setTimeout( async () => {

                    if(config.guide.extraSpecies.length > 0 && collection.guideType !== 'PICKER') {          

                        // we ignore picker because new picker lesson will be bound in the usual way

                        collection.items = collection.items.filter(item => {
                            return R.contains(item.name, config.guide.species);
                        });
    
                        const species = config.guide.extraSpecies.map(sp => { return { name: sp }; });              
                        await lessonStateHandler.addExtraSpeciesSelection(config, collection, species);
                        onCloseModalListeners.forEach(listener => listener(collection));
                        onCloseModalListeners.pop();
                        lessonStateHandler.clearGuide();
                        
                    } else {
                        onCloseModalListeners.forEach(listener => listener(collection));
                        onCloseModalListeners.pop();
                        lessonStateHandler.clearGuide();
                    }
                });
            });   
        });

        title.innerHTML = 'New collection species.';

        const editSpecies = modal.querySelector('.js-edit-species');
              editSpecies.addEventListener('click', e => {
                const selectedSpeciesDisplay = modal.querySelector('.js-selected-species-container');
                      selectedSpeciesDisplay.classList.add('open');
                      selectedSpeciesDisplay.classList.remove('hide-important');
                      selectedSpeciesDisplay.innerHTML = '';
                      editSpecies.classList.add('hide-important');
                speciesEditor(config, modal, selectedSpeciesDisplay, createGuide, collection.items.map(i => i.name));

                const collectionName = modal.querySelector('#js-collection-name');
                      collectionName.classList.add('hide-important');

                const editableCollectionName = modal.querySelector('#js-input-collection-name');
                      editableCollectionName.classList.remove('hide-important');
                      editableCollectionName.addEventListener('focusout', e => {                          
                          collectionName.innerHTML = e.target.value;
                          collectionName.classList.remove('hide-important');
                          editableCollectionName.classList.add('hide-important');
                          config.guide.name = e.target.value;
                          createGuide.setConfig(config);
                          collection.name =  e.target.value;
                      });
              });
    };

    const initLesson = async collectionToLoad => {

    config.collection.id = collectionToLoad.id;
    config.guide.guideType = option;

    const lesson = await lessonStateHandler.loadLesson(collectionToLoad, config, collections);
    
    const collection = lesson.collection;

    if(collection && collection.items && collection.items.length > 0) {
        renderNewCollectionSummary(collection);
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

   switch(option) {

        case enums.guideOption.LOCATION.name:
            initLesson({ 
                ...collections.find(c => c.guideType === option),
                id: collections.length + 10000,
                name: config.guide.place.name,
                taxa: config.guide.iconicTaxa.map(i => i.common).join(', '),
                iconicTaxa: config.guide.iconicTaxa,
            });
            break;
        case enums.guideOption.INAT.name:
            initLesson({
                ...collections.find(c => c.guideType === option),
                id: collections.length + 10000,                
                name: `${config.guide.inatId.key}'s observations`,
                taxa: config.guide.iconicTaxa.map(i => i.common).join(', '),
                iconicTaxa: config.guide.iconicTaxa,
            });        
            break;
        case enums.guideOption.PICKER.name:
            initLesson({
                ...collections.find(c => c.guideType === option),
                species: config.guide.species.map(sp => { return { name: sp } })
            });
            break;
    }

   const title = modal.querySelector('.js-options');
         title.innerHTML = 'Requesting species images and traits.';
};