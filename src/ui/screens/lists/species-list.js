import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { modalImageHandler } from 'ui/helpers/image-handlers';
import { endOfRoundHandler } from 'ui/helpers/lesson-handlers';
import { buildTable } from 'ui/screens/lists/species-list-table';

export const renderSpeciesCollectionList = (collection, collectionFromLastRound, readOnlyMode = false) => {

    if(collection.userSelection) return;

    subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
    
    if(collection.id === 0) return;

    const { config, history, counter, collections  } = store.getState();

    config.collection = { id: collection.id };

    buildTable(collection, config);

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

    // Portrait mode only

    if(continueLearningActionBtn) {
        
        if(history || counter.isLessonPaused) {
            continueLearningActionBtn.innerHTML = 'Continue lesson';
        }

        continueLearningActionBtn.addEventListener('click', event => {

            if(readOnlyMode) {
                const lessonStateMode = counter.isLessonPaused ? 'restartLesson' : 'nextRound';
                endOfRoundHandler.changeCollection(lessonStateMode, collections, collection, config, history);
            }
            else {
                endOfRoundHandler.changeCollection('newLesson', collections, collection, config, history, continueLearningActionBtn);
            }

            actions.boundNewPage({ name: ''});

            subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));
            subscription.getByName('renderHistory').forEach(sub => subscription.remove(sub));

            // event.target.setAttribute("disabled", "disabled");
        });
    }
};