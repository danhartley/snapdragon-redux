import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { renderCard } from 'ui/screens/cards/card';
import { modalImageHandler } from 'ui/helpers/image-handlers';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import { getTraits } from 'api/traits/traits';
import { buildTable } from 'ui/screens/lists/species-list-table';
import { itemHandler } from 'ui/helpers/item-handler';
import { updateLocalLesson } from 'ui/helpers/local-collection';

export const renderSpeciesCollectionList = (collection, readOnlyMode = false) => {

    const { config, history, counter, enums, layout  } = store.getState();

    if(lessonLogicHandler.isSkippable(collection, counter, config, layout)) return;

    subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
    
    if(collection.id === 0) return;

    if(collection.id === 8) {
        updateLocalLesson(document.getElementById('8'), config);
    }

    config.collection = { id: collection.id };

    const traits = getTraits(enums);

    function callback(collection, config, traits) {
        return function () {
            buildTable(collection, config, traits);
            doEveryThingElse();
        }
      }

    itemHandler(collection, config, counter, callback(collection, config, traits));

    const doEveryThingElse = () => {
        const headerCheckbox = document.querySelector(".table-header #inputCheckAll");
        const itemCheckboxes = document.querySelectorAll(".table-row .custom-control-input");

        if(headerCheckbox) {
            if(readOnlyMode) {
                headerCheckbox.disabled = true;
            } else {
                headerCheckbox.addEventListener('click', event => {
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
                    const name = checkbox.getAttribute('name');
                    const item = collection.items.find(item => item.name === name);
                    if(checkbox.checked) {
                        item.isDeselected = false;
                    } else { 
                        item.isDeselected = true;
                    }
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
            speciesCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const name = event.target.dataset.name;
                    const parent = document.querySelector('#speciesCardModal .js-modal-body');
                    renderCard(collection, true, collection.items.find(i => i.name === name), parent);
                });
            });
        }, 1000);

        // Portrait mode only

        if(continueLearningActionBtn) {
                    
            if(history || counter.isLessonPaused) {
                continueLearningActionBtn.innerHTML = 'Continue lesson';
            }
            
            if(collection.isLessonComplete) {
                continueLearningActionBtn.innerHTML = 'End lesson (delete data) | Pick new lesson';
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
};