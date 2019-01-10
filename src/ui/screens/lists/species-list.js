import * as R from 'ramda';

import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { renderCard } from 'ui/screens/cards/card';
import { renderTaxonCard } from 'ui/screens/cards/taxon-card';
import { renderNonTaxonCard } from 'ui/screens/cards/non-taxon-card';
import { modalImageHandler } from 'ui/helpers/image-handlers';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import { getTraits } from 'api/traits/traits';
import { buildTable } from 'ui/screens/lists/species-table-no-scores';
import { itemHandler } from 'ui/helpers/item-handler';
import { listenToRangeUpdate } from 'ui/helpers/iconic-taxa-handler';

export const renderSpeciesCollectionList = (collection, readOnlyMode = false) => {

    const { config: configState, history, counter, enums, layout  } = store.getState();

    let config = R.clone(configState);

    if(lessonLogicHandler.isSkippable(collection, counter, config, layout, 'renderSpeciesCollectionList', readOnlyMode)) return;

    subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
    
    if(collection.id === 0) return;

    config.collection = { id: collection.id };

    const handleUserEvents = () => {
        const headerCheckbox = document.querySelector(".table-header #inputCheckAll");
        const itemCheckboxes = document.querySelectorAll(".table-row .custom-control-input");

        let hasCollectionChanged = false;

        if(headerCheckbox) {
            if(readOnlyMode) {
                headerCheckbox.disabled = true;
            } else {
                headerCheckbox.addEventListener('click', event => {
                    hasCollectionChanged = true;
                    if(headerCheckbox.checked) {
                        itemCheckboxes.forEach(checkbox => {
                            checkbox.checked = true;
                        });        
                        collection.items.forEach(item => item.isDeselected = false);
                    } else { 
                        itemCheckboxes.forEach(checkbox => {
                            checkbox.checked = false;
                        });                
                        collection.items.forEach(item => item.isDeselected = true);
                    }                
                    actions.boundChangeCollectionItems(collection.items);
                });
            }
        }

        itemCheckboxes.forEach(checkbox => {
            if(readOnlyMode) { 
                checkbox.disabled = true;
            } else {     
                checkbox.addEventListener('click', event => {
                    hasCollectionChanged = true;
                    const name = checkbox.getAttribute('name');
                    const item = collection.items.find(item => item.name === name);
                    item.isDeselected = !checkbox.checked;
                    actions.boundChangeCollectionItems(collection.items);
                });
            }
        });

        const listItemImages = document.querySelectorAll('.table-row img');

        listItemImages.forEach(itemImage => { 
            const item = collection.items.find(item => item.name === itemImage.dataset.id)
            modalImageHandler(itemImage, item, collection, config); 
        });    

        const continueLearningActionBtn = document.querySelector('.js-species-list-btn-action');

        setTimeout(() => {
            const speciesCardLinks = document.querySelectorAll('.js-species-card-link span');
            const parent = document.querySelector('#speciesCardModal .js-modal-body');
            speciesCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const name = event.target.dataset.name;
                    renderCard(collection, true, collection.items.find(i => i.name === name), parent);
                });
            });
            const traitCardLinks = document.querySelectorAll('.js-key-trait-link');
            traitCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const keyTrait = event.target.dataset.keyTrait;
                    const imageUrl = event.target.dataset.url.replace('.98x68.jpg', '.260x190.jpg');              
                    renderNonTaxonCard(collection, true, keyTrait, parent, imageUrl);
                });
            });
            const familyCardLinks = document.querySelectorAll('.js-family-link');
            familyCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const family = event.target.dataset.family;
                    const name = event.target.dataset.speciesName;
                    renderTaxonCard(collection, true, collection.items.find(i => i.name === name), parent, family);
                });
            });

            document.querySelectorAll('.mushroom-icon').forEach(icon => {
                icon.innerHTML = '<svg-icon><src href="./icons/si-glyph-mushrooms.svg"/></svg>';
            });
        });

        // Portrait mode only

        if(continueLearningActionBtn) {
        
            if(history || counter.isLessonPaused) {
                continueLearningActionBtn.innerHTML = 'Continue lesson';
            }
            
            if(collection.isLessonComplete) {
                continueLearningActionBtn.innerHTML = 'End lesson (delete data) | Choose a new lesson';
            }

            continueLearningActionBtn.addEventListener('click', event => {

                if(collection.isLessonComplete) {
                    lessonLogicHandler.purgeLesson();
                } else {
                    if(readOnlyMode) {
                        const lessonStateMode = counter.isLessonPaused ? 'restartLesson' : 'nextRound';
                        lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history);
                    }
                    else {
                        lessonLogicHandler.changeCollection('newLesson', collection, config, history, continueLearningActionBtn);
                    }

                    actions.boundNewPage({ name: ''});

                    subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
                    subscription.getByName('renderHistory').forEach(sub => subscription.remove(sub));
                }            
            });
        }
    };    

    const traits = getTraits(enums);

    if(readOnlyMode) {
        buildTable(collection, config, traits, enums);
        handleUserEvents();
    }
    else {        
        function callback(collection, config, traits, enums) {
            return function () {
                buildTable(collection, config, traits, enums);
                handleUserEvents();
            }
        }
        itemHandler(collection, config, counter, callback(collection, config, traits, enums));
    }
};

listenToRangeUpdate((filters, config) => {
    const { collection } = store.getState();
    renderSpeciesCollectionList(collection, false);
});