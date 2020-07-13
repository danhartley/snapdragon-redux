import { Modal } from 'bootstrap';

import { contains } from 'ramda';

import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { listenToInatRequests } from 'api/inat/inat';
import { enums } from 'ui/helpers/enum-helper';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { lessonStateHelper } from 'ui/screens/lists/lesson-state-helper';
import { speciesInGuideEditor } from 'ui/create-guide-modal/species-in-guide-editor';

import spinnerTemplate from 'ui/create-guide-modal/species-search-template.html';
import speciesSummaryTemplate from 'ui/create-guide-modal/species-summary-template.html';

export const initialiseLesson = createGuide => {

    const { config, modal, option } = createGuide;
    const { collections } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = spinnerTemplate;

    const parent = modal.querySelector('.js-step-action-content');

    renderTemplate({ }, template.content, parent);

    const feedback = document.querySelector('.js-request-feedback');

    let count = 0;

    const interval = setInterval(() => {
      count = count === config.guide.iconicTaxa.length ? 0 : count;
      feedback.innerHTML = `Fetching ${config.guide.iconicTaxa[count].common} from iNaturalist …`;
      count++;
    }, 2000);

    const nextStepActionArrow = modal.querySelector('.js-right');
    const viewGuideIcon = nextStepActionArrow.querySelector('svg');
          viewGuideIcon.classList.add('snap-inactive');

    const back = modal.querySelector('.js-left .js-arrow-wrapper');
    const viewTaxaIcon = back.querySelector('svg');
          viewTaxaIcon.classList.add('snap-inactive');

    const renderLessonSummary = collection => {

      try {

        if(collection && collection.items && collection.items.length === 0) {
            feedback.innerHTML = 'No species were found. Try widening your parameters.';
            return;
        }

        clearTimeout(interval);

        template.innerHTML = speciesSummaryTemplate;

        feedback.innerHTML = '';

        collection.taxa = collection.guide.iconicTaxa.map(taxon => taxon.common).join(', ');
        
        renderTemplate({ collection }, template.content, feedback);

        const icon = modal.querySelector('.icon svg');
              icon.classList.remove('slow-spin');

        setTimeout(() => {
          nextStepActionArrow.addEventListener('click', e => {

                setTimeout( async () => {

                  snapLog('config.guide.species', config.guide.species)

                  if(config.guide.species) {

                      collection.items = collection.items.filter(item => {
                          return contains(item.name, config.guide.species.map(sp => sp.name));
                      });
  
                      await lessonStateHandler.changeRequest({
                          requestType: enums.lessonState.ADD_SPECIES_TO_COLLECTION,
                          requestArgs: { config, collection }
                      });
                  }

                  if(parseInt(nextStepActionArrow.dataset.number) === 4) {
                      createGuide.callOnCreateCustomListeners(collection);
                      lessonStateHelper.clearGuide();
                      var createGuideModal = Modal.getInstance(document.getElementById('createGuide'));
                      createGuideModal.hide();
                      document.querySelector('.modal-backdrop.show.fade').style.display = 'none';
                  }
                });
            });   
        });

        title.innerHTML = 'New collection species';

        const editSpecies = modal.querySelector('.js-edit-species');
              editSpecies.addEventListener('click', e => {
                const selectedSpeciesDisplay = modal.querySelector('.js-selected-species-container');
                      selectedSpeciesDisplay.classList.add('open');
                      selectedSpeciesDisplay.classList.remove('hide-important');
                      selectedSpeciesDisplay.innerHTML = '';
                      editSpecies.classList.add('hide-important');
                      
                speciesInGuideEditor(config, modal, selectedSpeciesDisplay, createGuide, collection.items);

                const editableCollectionName = modal.querySelector('#js-input-collection-name');
                      editableCollectionName.classList.remove('hide-important');
                      editableCollectionName.addEventListener('focusout', e => {      
                          const name = e.target.value;
                          config.guide.name = name;
                          collection.name =  name;
                          lessonStateHandler.changeRequest( { requestType: enums.lessonState.UPDATE_COLLECTION, requestArgs: { collection, config } });
                          
                      });
              });

        viewGuideIcon.classList.remove('snap-inactive');
        viewTaxaIcon.classList.remove('snap-inactive');

        } catch(e) {
          logError(renderLessonSummary, e);
        }
    };

    const initLesson = async collectionToLoad => {
        
        const counter = { 
            index: 0,
            isLessonPaused: true
        }
        
        const lesson = await lessonStateHandler.changeRequest({
            requestType: enums.lessonState.GET_LESSON_STATE,
            requestArgs: {
                collectionToLoad,
                updatedCounter: counter,
                config: createGuide.getConfig()
            }
        });

        snapLog('initLesson', lesson);
        
        const collection = lesson.collection;
              collection.guide = config.guide;
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

        case enums.guideType.LOCATION.name:
            initLesson({ 
                ...collections.find(c => c.guideType === option),                
                name: config.guide.place.name,
                taxa: config.guide.iconicTaxa.map(i => i.common).join(', '),
                guide: config.guide,
                language: config.language,
                id: collections.length + 100010, // hack to avoid clashes with existing lessons
            });
            break;

        case enums.guideType.INAT.name:
            initLesson({
                ...collections.find(c => c.guideType === option),  
                name: `${config.guide.inatId.key}'s observations`,
                taxa: config.guide.iconicTaxa.map(i => i.common).join(', '),
                iconicTaxa: config.guide.iconicTaxa,
                id: collections.length + 10000,
            });        
            break;

        case enums.guideType.PICKER.name:

            const initPicker = async () => {

                const { collection } = store.getState();

                let addingExtraSpecies = false;
                
                if(collection.items) {
                    addingExtraSpecies = collection.items.map(i => i.name).every(val => config.guide.species.map(s => s.name).includes(val));
                }
    
                let collectionToLoad;
    
                if(addingExtraSpecies) {
                    collectionToLoad = collection;
                    await lessonStateHandler.changeRequest({
                        requestType: enums.lessonState.ADD_SPECIES_TO_COLLECTION,
                        requestArgs: {
                            updatedConfig: config, updatedCollection: collectionToLoad
                        }
                    });
                } else {
                    collectionToLoad = {
                        ...collections.find(c => c.guideType === option),
                        species: config.guide.species,
                        id: collections.length + 10010,
                        name: 'Your new lesson',
                        hasVideo: false,
                        video: {},
                        terms: []
                    };
                }

                initLesson(collectionToLoad);
            };

            initPicker();

            break;
    }

   const title = modal.querySelector('.js-options > h1');
         title.innerHTML = 'Requesting species images and traits';
};