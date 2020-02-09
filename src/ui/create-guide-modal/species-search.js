import * as R from 'ramda';

import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { listenToInatRequests } from 'api/inat/inat';
import { snapdragonCollections } from 'snapdragon-config/snapdragon-collections';
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

export const speciesSearch = context => {

    const { config, modal, option } = context;

    const template = document.createElement('template');
          template.innerHTML = spinnerTemplate;

    const parent = modal.querySelector('.js-step-action-content');

    renderTemplate({ }, template.content, parent);

    const feedback = document.querySelector('.js-request-feedback');

    const renderNewCollectionSummary = collection => {

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

        title.innerHTML = 'Matching species.';

        const editSpecies = modal.querySelector('.js-edit-species');
              editSpecies.addEventListener('click', e => {
                const selectedSpeciesDisplay = modal.querySelector('.js-selected-species-container');
                      selectedSpeciesDisplay.classList.remove('hide-important');
                      selectedSpeciesDisplay.style.height = "300px";
                      selectedSpeciesDisplay.innerHTML = '';
                speciesEditor(config, modal, selectedSpeciesDisplay, context, collection.items.map(i => i.name));
              });
    };

    const initInatLesson = async collectionToLoad => {

    const { collections } = store.getState();

    let collection = {
        ...collectionToLoad,
        id: collections.length + 10000,
        taxa: config.guide.iconicTaxa.map(i => i.common).join(', '),
        iconicTaxa: config.guide.iconicTaxa
    };
    
    collection.name = getCollectionName(config, collection);

    config.collection.id = collection.id;
    config.guide.guideType = option;

    const lesson = await lessonStateHandler.loadLesson(collection, config, collections);
    
    collection = lesson.collection;

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

   const initSelectedSpeciesLesson = async collectionToLoad => {

    config.collection.id = collectionToLoad.id;

    const { collections } = store.getState();

    const { collection } = await lessonStateHandler.loadLesson(collectionToLoad, config, collections);
    
    renderNewCollectionSummary(collection);
   };

   switch(option) {
        case enums.guideOption.LOCATION.name:
            initSelectedSpeciesLesson({ 
                ...snapdragonCollections.find(c => c.guideType === option),
                iconicTaxa: config.guide.iconicTaxa,
                name: config.guide.place.name
            });
            break;
        case enums.guideOption.INAT.name:
            initInatLesson(snapdragonCollections.find(c => c.guideType === option));
            break;
        case enums.guideOption.PICKER.name:
            initSelectedSpeciesLesson({
                ...snapdragonCollections.find(c => c.guideType === option),
                species: config.guide.species.map(sp => { return { name: sp } })
            });
            break;
    }

   const title = modal.querySelector('.js-options');
         title.innerHTML = 'Searching for matching species.';
};

const getCollectionName = (config, lesson) => {
        
    let name = lesson.name;

    if(config.guide.inatId.key.length > 0) {
        name = `${config.guide.inatId.key}'s observations`;
    } else if(config.guide.locationLongLat) {
        name = config.guide.locationLongLat.split(',')[0];
    }
    
    return name;
};