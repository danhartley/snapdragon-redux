import * as R from 'ramda';

import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { listenToInatRequests } from 'api/inat/inat';
import { enums } from 'ui/helpers/enum-helper';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { speciesInGuideEditor } from 'ui/create-guide-modal/species-in-guide-editor';

import spinnerTemplate from 'ui/create-guide-modal/species-search-template.html';
import speciesSummaryTemplate from 'ui/create-guide-modal/species-summary-template.html';

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

    const renderLessonSummary = collection => {

        if(collection && collection.items && collection.items.length === 0) {
            feedback.innerHTML = 'No species were found. Try widening your parameters.';
            return;
        }

        clearTimeout(timer);

        template.innerHTML = speciesSummaryTemplate;

        feedback.innerHTML = '';

        collection.taxa = collection.iconicTaxa.map(taxon => taxon.common).join(', ');
        
        renderTemplate({ collection }, template.content, feedback);

        const icon = modal.querySelector('.icon i');
              icon.classList.remove('slow-spin');

        const close = modal.querySelector('.js-right .js-arrow-wrapper');

        setTimeout(() => {
            close.addEventListener('click', e => {
                setTimeout( async () => {

                    collection.items = collection.items.filter(item => {
                        return R.contains(item.name, config.guide.species.map(sp => sp.name));
                    });

                    await lessonStateHandler.addExtraSpeciesSelection(config, collection);

                    if(parseInt(close.dataset.number) === 4) {
                        createGuide.callOnCreateCustomListeners(collection);
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
                speciesInGuideEditor(config, modal, selectedSpeciesDisplay, createGuide, collection.items);

                const collectionName = modal.querySelector('#js-collection-name');
                      collectionName.classList.add('hide-important');

                const editableCollectionName = modal.querySelector('#js-input-collection-name');
                      editableCollectionName.classList.remove('hide-important');
                      editableCollectionName.addEventListener('focusout', e => {      
                          const name = e.target.value;                    
                          collectionName.innerHTML = name;
                          collectionName.classList.remove('hide-important');
                          editableCollectionName.classList.add('hide-important');
                          config.guide.name = name;
                          collection.name =  name;
                          lessonStateHandler.updateCollection(config, collection);
                      });
              });
    };

    const initLesson = async collectionToLoad => {
        
        config.collection.id = collectionToLoad.id;

        const lesson = await lessonStateHandler.loadLesson(collectionToLoad, config, collections);
        
        const collection = lesson.collection;
              collection.iconicTaxa = collection.iconicTaxa.filter(taxon => R.contains(taxon.id, config.guide.iconicTaxa));
              collection.isPrivate = true;
        
        renderLessonSummary(collection);

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

    config.guide.guideType = option;

    switch(option) {

        case enums.guideOption.LOCATION.name:
            initLesson({ 
                ...collections.find(c => c.guideType === option),                
                name: config.guide.place.name,
                taxa: config.guide.iconicTaxa.map(i => i.common).join(', '),
                iconicTaxa: config.guide.iconicTaxa,
                id: collections.length + 10000,
            });
            break;
        case enums.guideOption.INAT.name:
            initLesson({
                ...collections.find(c => c.guideType === option),  
                name: `${config.guide.inatId.key}'s observations`,
                taxa: config.guide.iconicTaxa.map(i => i.common).join(', '),
                iconicTaxa: config.guide.iconicTaxa,
                id: collections.length + 10000,
            });        
            break;
        case enums.guideOption.PICKER.name:

            const initPicker = async () => {

                const { collection } = store.getState();

                let addingExtraSpecies = false;
                
                if(collection.items) {
                    addingExtraSpecies = collection.items.map(i => i.name).every(val => config.guide.species.map(s => s.name).includes(val));
                }
    
                let collectionToLoad;
    
                if(addingExtraSpecies) {
                    collectionToLoad = collection;
                    await lessonStateHandler.addExtraSpeciesSelection(config, collectionToLoad);
                } else {
                    collectionToLoad = {
                        ...collections.find(c => c.guideType === option),
                        species: config.guide.species,
                        id: collections.length + 10000,
                    };
                }

                initLesson(collectionToLoad);
            };

            initPicker();

            break;
    }

   const title = modal.querySelector('.js-options');
         title.innerHTML = 'Requesting species images and traits.';
};